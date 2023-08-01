'use client'

import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import React from "react";

import closeEyes from './assets/close-eyes.svg'
import openEyes from './assets/open-eyes.svg'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SimpleRegistrationForm() {
    const [loading, setloading] = React.useState(false)
    const [datalogin, setdatalogin] = React.useState({ username: "", password: "" })
    const [seepassword, setseepassword] = React.useState(false)
    const router = useRouter()

    const onSubmit = async () => {
        setloading(true)

        const fetchLogin = await fetch("http://localhost:3001/api/auth", {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                username: datalogin.username,
                password: datalogin.password
            })
        })

        const data = await fetchLogin.json()

        if (data?.access_token) {
            router.refresh()
            router.push("/dashboard")

            return
        }

        setloading(false)
        return
    }

    return (
        <Card className="h-full p-4 shadow-xl shadow-blue-gray-900/5 bg-opacity-80">
            <Typography variant="h4" color="blue-gray">
                LogIn
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to login.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Username"
                        value={datalogin.username}
                        onChange={(e) => setdatalogin((data) => ({ ...data, username: e?.target?.value }))}
                    />
                    <Input
                        type={seepassword ? "text" : "password"}
                        size="lg"
                        label="Password"
                        value={datalogin.password}
                        onChange={(e) => setdatalogin((data) => ({ ...data, password: e?.target?.value }))}
                        icon={
                            <div onClick={() => setseepassword(!seepassword)} className="cursor-pointer">
                                {seepassword ? <Image src={closeEyes} alt="closeEyes" /> : <Image src={openEyes} alt="openEyes" />}
                            </div>} />
                </div>
                <Button disabled={loading} onClick={onSubmit} className="mt-6" fullWidth>
                    Login
                </Button>
            </form>
        </Card>
    );
}