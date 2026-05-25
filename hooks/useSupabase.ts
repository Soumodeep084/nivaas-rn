import { createClerkSupabaseClient } from "@/lib/supabase";
import { useAuth } from "@clerk/expo";
import { useMemo } from "react";

export function useSupabase() {
    const { getToken } = useAuth();

    const client = useMemo(
        () => createClerkSupabaseClient(() => getToken()),
        [getToken]
    );

    return client;
}


/*

In This file, we create a custom hook `useSupabase` that initializes a Supabase client using the `createClerkSupabaseClient` function. This client is configured to use the authentication token provided by Clerk, ensuring that all requests made with this client are authenticated.

The `useMemo` hook is used to memoize the Supabase client, so it will only be re-created if the `getToken` function changes. This optimization prevents unnecessary re-initializations of the client on every render, improving performance.

*/