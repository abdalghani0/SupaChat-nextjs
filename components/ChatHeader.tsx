"use client";
import React from 'react';
import { Button } from './ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { User } from "@supabase/supabase-js"
import { useRouter } from 'next/navigation';
import ChatPresence from './ChatPresence';
import { toast } from 'sonner';

export default function chatHeader({ user } : { user: User | undefined}) {
    const router = useRouter();

    const handleLoginWithGithub = () => {
        const supabase = supabaseBrowser();
        supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: location.origin + "/auth/callback",
            }
        });
    };

    const handleLogout = async() => {
        const supabase = supabaseBrowser();
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div className="h-20">

          <div className="p-5 border-b flex items-center justify-between h-full">

            <div>

              <h1 className="text-xl font-bold">SupaChat</h1>

              <ChatPresence/>

            </div>

            {user ?  <Button onClick={handleLogout}>logout</Button>
                  :   <Button onClick={handleLoginWithGithub}>login</Button>
            }

          </div>

        </div>
    );
}
