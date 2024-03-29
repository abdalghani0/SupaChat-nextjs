/*
"use client"
import React from 'react';
import { Button } from './ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { LIMIT_MESSAGE } from '@/lib/constants/idex';
import { getFromAndTo } from '@/lib/utils';
import { Imessage, useMessage } from '@/lib/store/messages';
import { toast } from 'sonner';
import { useRooms } from '@/lib/store/rooms';
import { useUsers } from '@/lib/store/users';

function LoadMoreMessages() {
    const page = useMessage((state) => state.page);
    const setMessages = useMessage((state) => state.setMessages);
    const hasMore = useRooms((state) => state.hasMore);
    const {currentUser} = useUsers();

    const fetchMore = async() => {
        const {from, to} = getFromAndTo(page, LIMIT_MESSAGE);
        const supabase = supabaseBrowser();
        const {data, error} = await supabase
            .from("messages")
            .select("*, users(*)")
            .in("room_id", currentUser?.rooms!)
            .range(from, to)
            .order("created_at", {ascending: false});
        if(error) {
            toast.error(error.message)
        }
        else {
            setMessages(data.reverse() as Imessage[] || []);
        }
    }
    if(hasMore) {
        return (
            <Button 
                variant="outline" 
                className="w-full"
                onClick={fetchMore}>
                    Load more
            </Button>
        );
    }
    else {
        return <></>;
    }
}

export default LoadMoreMessages;
*/