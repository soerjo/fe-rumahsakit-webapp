'use client'

import React from 'react'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { postPasien } from './createpasien.action';
import { useRouter } from 'next/navigation';
import ErrorAlert from './errorAlert';

// export interface IPraktek {
//     nama_praktek: string;
//     biaya: number;
//     dokter: {
//         fullname: string
//     }
// }


const FormInput = ({ pasien }: { pasien: any }) => {
    const [createPasien, setcreatePasien] = React.useState({
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
        // const res = await postPasien(createPasien)
        // if (res?.statusCode === 400) return setinputerror(res?.message)

        // router.push("/dashboard")
    }

    // console.log({ pasien })
    return (
        <div className='w-full'>
            {inputerror && <ErrorAlert error={inputerror} />}
            <form onSubmit={onSubmit} className='flex w-full flex-col items-end gap-6 p-6'>
                <Input
                    className='capitalize'
                    onChange={e => setcreatePasien(value => ({ ...value, fullname: e.target.value }))}
                    defaultValue={pasien.fullname}
                    size={"lg"} label="Nama Pasien"
                    error={false} />
                <div className='flex flex-row w-full gap-6'>
                    <Input
                        onChange={e => setcreatePasien(value => ({ ...value, tanggal_lahir: new Date(e.target.value) }))}
                        defaultValue={new Date(pasien.tanggal_lahir).toISOString().substring(0, 10)}
                        size={"md"}
                        label="Tanggal Lahir"
                        type='date'
                        error={false} />

                    <Input
                        onChange={e => setcreatePasien(value => ({ ...value, tinggi: parseInt(e.target.value) }))}
                        size={"md"}
                        label="Tinggi"
                        defaultValue={pasien.tinggi}
                        error={false} />

                    <Input
                        onChange={e => setcreatePasien(value => ({ ...value, berat_badan: parseInt(e.target.value) }))}
                        size={"md"}
                        label="Berat Badan"
                        defaultValue={pasien.berat_badan}
                        error={false} />

                </div>


                {/* <Select label="Praktek Dokter"
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
                </Select> */}
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default FormInput