"use client";

import React from "react";
import { Navbar, Typography } from "@material-tailwind/react";

const getAlias = (username: string) => {
    const [first, last] = username?.split(" ")
    if (last) return (first[0] + last[0]).toUpperCase()

    return (first[0] + first[1]).toUpperCase()
}

function NavbarSimple({ user }: { user: any }) {
    function NavList() {
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg">{user?.username}</h3>
                    <div className="flex justify-center items-center bg-blue-500 h-8 w-8 rounded-full text-white text-sm">
                        {getAlias(user?.username)}
                    </div>
                </div>
            </ul>
        );
    }

    return (
        <div className="mx-3 mt-3">
            <Navbar className="min-w-full px-6 py-3">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/dashboard"
                        variant="h6"
                        className="mr-4 cursor-pointer py-1.5"
                    >
                        Puskesmas Balai Bersama
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                </div>
            </Navbar>
        </div>
    );
}

export default NavbarSimple