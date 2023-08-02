'use client'

import React from 'react'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { postObat } from './createobat.action';
import { useRouter } from 'next/navigation';
import ErrorAlert from './errorAlert';
import { satuanObat } from '@/constant/satuanObat.constant';

export interface IPraktek {
    nama_praktek: string;
    biaya: number;
    dokter: {
        fullname: string
    }
}

export interface ICreateObat {
    nama_obat: string,
    kandungan_obat: string,
    merek_obat: string,
    keterangan: string,
    qty_obat: number,
    satuan_obat: string,
    harga_jual_satuan: number,
    harga_beli_satuan: number
}

const FormInput = ({ listPraktek }: { listPraktek?: IPraktek[] }) => {
    const [createObat, setcreateObat] = React.useState<ICreateObat>({
        "nama_obat": "",
        "kandungan_obat": "",
        "merek_obat": "",
        "keterangan": "",
        "qty_obat": 0,
        "satuan_obat": "",
        "harga_jual_satuan": 0,
        "harga_beli_satuan": 0
    })
    const [inputerror, setinputerror] = React.useState<string[] | null>(null)
    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await postObat(createObat)
        if (res?.statusCode === 400) return setinputerror(res?.message)

        router.push("/dashboard")
    }

    console.log({ inputerror, createObat })
    return (
        <div className='w-full'>
            <ErrorAlert error={inputerror || []} />
            <form onSubmit={onSubmit} className='flex w-full flex-col items-end gap-6 p-6'>
                <Input
                    onChange={e => setcreateObat(value => ({ ...value, nama_obat: e.target.value }))}
                    value={createObat.nama_obat}
                    size={"lg"} label="Nama Obat"
                    error={false} />

                <Input
                    onChange={e => setcreateObat(value => ({ ...value, kandungan_obat: e.target.value }))}
                    value={createObat.kandungan_obat}
                    size={"lg"} label="Kandungan Obat"
                    error={false} />

                <Input
                    onChange={e => setcreateObat(value => ({ ...value, merek_obat: e.target.value }))}
                    value={createObat.merek_obat}
                    size={"lg"} label="Merek Obat"
                    error={false} />

                <Input
                    onChange={e => setcreateObat(value => ({ ...value, keterangan: e.target.value }))}
                    value={createObat.keterangan}
                    size={"lg"} label="Keterangan"
                    error={false} />

                <Input
                    onChange={e => setcreateObat(value => ({ ...value, qty_obat: parseInt(e.target.value) }))}
                    size={"lg"} label="Qty Obat"
                    type='number'
                    error={false} />

                <Select label="Satuan Obat"
                    size={"lg"} onChange={e => setcreateObat(value => ({ ...value, satuan_obat: e || "" }))}
                >
                    {satuanObat.map((praktek, index) => (
                        <Option value={`${praktek}`} key={index} >{praktek}</Option>
                    ))}
                </Select>

                <Input
                    onChange={e => setcreateObat(value => ({ ...value, harga_beli_satuan: parseInt(e.target.value) }))}
                    size={"lg"} label="Harga Beli Satuan"
                    type='number'
                    error={false} />

                <Input
                    onChange={e => setcreateObat(value => ({ ...value, harga_jual_satuan: parseInt(e.target.value) }))}
                    size={"lg"} label="Harga Jual Satuan"
                    type='number'
                    error={false} />

                <Button type='submit'>Submit Obat</Button>
            </form>
        </div>
    )
}

export default FormInput