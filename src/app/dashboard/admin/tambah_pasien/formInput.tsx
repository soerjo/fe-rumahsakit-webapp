'use client'

import React from 'react'
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react'
import { postPasien } from './createpasien.action';
import { useRouter } from 'next/navigation';
import ErrorAlert from './errorAlert';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export interface IPraktek {
    nama_praktek: string;
    biaya: number;
    dokter: {
        fullname: string
    }
}

export interface ICreatePasien {
    fullname: string,
    email: string,
    phonenumber: number,
    tanggal_lahir: Date,
    tinggi: number,
    berat_badan: number,
    praktek: string
}

const FormInput = ({ listPraktek }: { listPraktek: IPraktek[] }) => {
    const [createPasien, setcreatePasien] = React.useState<ICreatePasien>({
        "fullname": "",
        "email": "",
        "phonenumber": 0,
        "tanggal_lahir": new Date(),
        "tinggi": 0,
        "berat_badan": 0,
        "praktek": ""
    })
    const [inputerror, setinputerror] = React.useState<string[] | null>(null)
    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await postPasien(createPasien)
        if (res?.statusCode === 400) return setinputerror(res?.message)

        router.push("/dashboard")
    }

    console.log({ inputerror })
    return (
        <div className='w-full'>

            <div className="rounded-none p-3">
                <div className="mb-3 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Registrasi Pasien
                        </Typography>
                    </div>
                </div>
            </div>
            {inputerror && <ErrorAlert error={inputerror} />}
            <form onSubmit={onSubmit} className='flex w-full flex-col items-end gap-6 p-3'>
                <Input
                    onChange={e => setcreatePasien(value => ({ ...value, fullname: e.target.value }))}
                    value={createPasien.fullname}
                    size={"lg"} label="Nama Pasien"
                    error={false} />

                <Input
                    onChange={e => setcreatePasien(value => ({ ...value, email: e.target.value }))}
                    value={createPasien.email}
                    size={"lg"} label="Email"
                    error={false} />

                <Input
                    onChange={e => setcreatePasien(value => ({ ...value, phonenumber: parseInt(e.target.value) }))}
                    value={createPasien.phonenumber}
                    size={"lg"} label="Nomor Telepon"
                    error={false} />

                <Input
                    onChange={e => setcreatePasien(value => ({ ...value, tanggal_lahir: new Date(e.target.value) }))}
                    // value={new Date(createPasien.tanggal_lahir).toISOString()}
                    size={"lg"} label="Tanggal Lahir" type='date'
                    error={false} />

                <Input
                    onChange={e => setcreatePasien(value => ({ ...value, tinggi: parseInt(e.target.value) }))}
                    size={"lg"} label="Tinggi"
                    type='number'
                    error={false} />

                <Input
                    onChange={e => setcreatePasien(value => ({ ...value, berat_badan: parseInt(e.target.value) }))}
                    size={"lg"} label="Berat Badan"
                    type='number'
                    error={false} />

                <Select label="Praktek Dokter"
                    size={"lg"} onChange={e => setcreatePasien(value => ({ ...value, praktek: e || "" }))}
                >
                    {
                        listPraktek.map((praktek, index) => (
                            <Option
                                value={`${praktek.nama_praktek}`}
                                key={index}
                            >
                                {`${praktek.nama_praktek} | ${praktek.dokter.fullname}`}
                            </Option>
                        ))
                    }
                </Select>
                <Button type='submit'>Tambah Pasien</Button>
            </form>
        </div>
    )
}

export default FormInput