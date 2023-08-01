'use client'

import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import sidebarConstant from './sidebar.constant.json'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Role } from "@/constant/role.constant";

interface IChildrenSidebar {
    menu_name: string;
    link: string;
}

interface ISidebar {
    menu_name: string;
    icon_menu: string;
    icon_src: string;
    children: IChildrenSidebar[]
}

function Sidebar({ user }: { user: any }) {
    const router = useRouter()
    const onLogout = async () => {
        await fetch("/api/logout")
        router.push("/")
    }

    const LinkMenu = ({ data }: { data: ISidebar }) => {
        const [open, setOpen] = React.useState(0);

        const handleOpen = (value: number) => {
            setOpen(open === value ? 0 : value);
        };

        return (
            <Accordion
                open={open === 1}
                icon={
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                    />
                }
            >
                <ListItem className="p-0" selected={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                        <ListItemPrefix>
                            <Image src={data.icon_src} alt={data.icon_menu} width={20} height={20} />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">
                            {data.menu_name}
                        </Typography>
                    </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                    <List className="p-0">
                        {
                            data.children.map((value, index) => (
                                <Link href={value.link} key={index}>
                                    <ListItem >
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        {value.menu_name}
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                </AccordionBody>
            </Accordion>
        )
    }

    return (
        <div className="py-3 pl-3 min-h-full">
            <Card className="h-full w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-opacity-80">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Sidebar
                    </Typography>
                </div>
                <List>
                    {
                        sidebarConstant.map((value, index) => {
                            if ((user.role as string).toLowerCase() === value.menu_name.toLowerCase())
                                return (<LinkMenu data={value} key={index} />)

                            if ((user.role as string).toLowerCase() === "super_root")
                                return (<LinkMenu data={value} key={index} />)
                        })
                    }

                    <div className="h-5" />

                    <ListItem onClick={onLogout}>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </div>
    );
}

export default Sidebar;