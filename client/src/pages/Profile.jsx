import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../features/userProfile/userProfileThunk";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.userProfile);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateProfile(data)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err || "Failed to update profile");
    }
  };

  return (
    <main className="flex-1 my-5 md:my-10">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">My Profile</h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name *</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-0 focus:border-bilbao-700 transition-colors duration-300"
              type="text"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-black/20 rounded-lg"
              type="email"
              disabled
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Street</label>
            <input {...register("address.street")} className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-0 focus:border-bilbao-700 transition-colors duration-300" type="text" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input {...register("address.city")} className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-0 focus:border-bilbao-700 transition-colors duration-300" type="text" />
            </div>

            <div>
              <label className="block mb-1 font-medium">State</label>
              <input {...register("address.state")} className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-0 focus:border-bilbao-700 transition-colors duration-300" type="text" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Zip Code</label>
              <input {...register("address.zip")} className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-0 focus:border-bilbao-700 transition-colors duration-300" type="text" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Country</label>
              <input {...register("address.country")} className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-0 focus:border-bilbao-700 transition-colors duration-300" type="text" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-bilbao-700 hover:bg-bilbao-900"} transition-colors duration-200 cursor-pointer`}
          >
            {loading ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Profile;
