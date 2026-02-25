import { User } from "../models/user.model.js";

export const getFriends = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const currentUser = await User.findOne({ clerkId }).populate(
      "frindes",
      "fullName imageUrl clerkId",
    );

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get friends with follower/following counts
    const friends = await Promise.all(
      (currentUser.frindes || []).map(async (friend) => {
        const friendData = await User.findById(friend._id).select(
          "fullName imageUrl clerkId followers follow",
        );
        return {
          _id: friendData?._id,
          fullName: friendData?.fullName,
          imageUrl: friendData?.imageUrl,
          clerkId: friendData?.clerkId,
          followersCount: friendData?.followers?.length || 0,
          followingCount: friendData?.follow?.length || 0,
        };
      }),
    );

    res.status(200).json(friends);
  } catch (error) {
    console.log("error in getFriends " + error);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("error in getAllUsers " + error);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.find({ _id: id });
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error in getUserById " + error);
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const id = req.auth.userId;
    const user = await User.find({ clerkId: id });
    res.status(200).json(user);
  } catch (error) {
    console.log("error in getCurrentUser " + error);
    next(error);
  }
};

export const followUser = async (req, res, next) => {
  try {
    const { toFollow } = req.pody;
    const authed = req.auth.userId;
    const authedId = await User.find({ clerkId: authed }).select("_id");

    await User.findByIdAndUpdate(authedId, {
      $push: { follow: toFollow },
    });
    await User.findByIdAndUpdate(toFollow, {
      $push: { followers: authedId },
    });

    const isFriend = await User.find({ clerkId: authed })
      .select("followers")
      .findById(toFollow);

    if (isFriend) {
      await User.findByIdAndUpdate(authedId, {
        $push: { frindes: toFollow },
      });
      await User.findByIdAndUpdate(toFollow, {
        $push: { frindes: authedId },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error in followUser " + error);
    next(error);
  }
};

export const unFollowUser = async (req, res, next) => {
  try {
    const { toUnFollow } = req.params;
    const authed = req.auth.userId;
    const authedId = await User.findOne({ clerkId: authed }).select("_id");

    await User.findByIdAndUpdate(authedId, {
      $pull: { follow: toUnFollow },
    });
    await User.findByIdAndUpdate(toUnFollow, {
      $pull: { followers: authedId },
    });

    const isFriend = await User.findById(authedId)
      .select("frindes")
      .findById(toUnFollow);

    if (isFriend) {
      await User.findByIdAndUpdate(authedId, {
        $pull: { frindes: toUnFollow },
      });
      await User.findByIdAndUpdate(toUnFollow, {
        $pull: { frindes: authedId },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error in unFollowUser " + error);
    next(error);
  }
};
