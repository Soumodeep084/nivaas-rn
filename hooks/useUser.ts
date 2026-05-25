import { useSupabase } from "@/hooks/useSupabase";
import { useUserStore } from "@/store/userStore";
import { useUser } from "@clerk/expo";
import { useEffect } from "react";

export const useUserSync = () => {
    const { user } = useUser();
    const setIsAdmin = useUserStore((state) => state.setIsAdmin);
    const authSupabase = useSupabase(); // ← authenticated client

    useEffect(() => {
        if (!user) return;
        syncUser();
    }, [user]);

    const syncUser = async () => {
        const { data } = await authSupabase
            .from("users")
            .select("clerk_id, is_admin")
            .eq("clerk_id", user!.id)
            .single();

        if (data) {
            setIsAdmin(data.is_admin ?? false);
            return;
        }

        const { data: newUser } = await authSupabase
            .from("users")
            .insert({
                clerk_id: user!.id,
                email: user!.emailAddresses[0].emailAddress,
                first_name: user!.firstName,
                last_name: user!.lastName,
                avatar_url: user!.imageUrl,
            })
            .select("is_admin")
            .single();

        setIsAdmin(newUser?.is_admin ?? false);
    };
};


/*

In this file, we define a custom hook `useUserSync` that synchronizes the authenticated user's information with our Supabase database.

1. We use the `useUser` hook from Clerk to get the current authenticated user.
2. We use the `useUserStore` hook to get the `setIsAdmin` function, which allows us to update the user's admin status in our Zustand store.
3. We use the `useSupabase` hook to get an authenticated Supabase client that can make requests on behalf of the user.
4. We set up a `useEffect` that runs whenever the `user` changes. If there is a user, we call the `syncUser` function.
5. The `syncUser` function first checks if the user already exists in the "users" table by querying with the user's Clerk ID. If the user exists, we update the admin status in our store.
6. If the user does not exist, we insert a new record into the "users" table with the user's information from Clerk and then update the admin status in our store based on the newly created record.


*/