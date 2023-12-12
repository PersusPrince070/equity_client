import Lucide from "../../base-components/Lucide";
import { Menu, Popover } from "../../base-components/Headless";
import TomSelect from "../../base-components/TomSelect";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
import { Dialog } from "../../base-components/Headless";
import Tippy from "../../base-components/Tippy";
import transactions from "../../fakers/transactions";
import users from "../../fakers/users";
import transactionStatus from "../../fakers/transaction-status";
import Button from "../../base-components/Button";
import Table from "../../base-components/Table";
import ProfileSearch from "../../components/ProfileSearch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import _ from "lodash";
import Pagination from '../../components/Pagination';

import { SERVER_URL } from "../../config";

function Main() {
    const [isProfileSearch, setIsProfileSearch] = useState<boolean>(false);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentCampaign, setCurrentCampaign] = useState<string>("");
    const [pageCount, setPageCount] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { id } = useParams();

    const handleProfiles = async () => {
        const res = await fetch(`${SERVER_URL}/campaigns/profiles/${id}?page=${currentPage}&pageSize=${rowsPerPage}`, {
            method: 'GET'
        })

        const { profiles, pageCount } = await res.json();
        console.log(profiles);

        setProfiles(profiles)
        setPageCount(Math.ceil(pageCount / rowsPerPage));
    }

    const handleCampaign = async () => {
        const res = await fetch(`${SERVER_URL}/campaigns/${id}`, {
            method: 'GET'
        })

        const { campaignName } = await res.json();
        console.log(campaignName);
        setCurrentCampaign(campaignName);
    }

    // const refreshProfiles = (newProfiles: any[]) => {
    //     setProfiles([...profiles, ...newProfiles]);
    // }

    useEffect(() => {
        if (!id) return;
        handleCampaign();
        handleProfiles();
    }, [id, currentPage, rowsPerPage]);

    return (
        <div className="grid grid-cols-12 gap-y-10 gap-x-6">
            <div className="col-span-12">
                <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                    <div className="text-base font-medium group-[.mode--light]:text-white opacity-70">
                        CAMPAIGN NAME : {currentCampaign}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                        <Button
                            variant="primary"
                            onClick={() => setIsProfileSearch(true)}
                            className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent hover:opacity-70"
                        >
                            <Lucide
                                icon="Plus"
                                className="stroke-[1.3] w-4 h-4 mr-2"
                            />{" "}
                            ADD PROFILES
                        </Button>
                    </div>
                </div>
                <div className="mt-3.5">
                    <div className="flex flex-col box box--stacked">
                        <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
                            <div>
                                <div className="relative">
                                    <Lucide
                                        icon="Search"
                                        className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                                    />
                                    <FormInput
                                        type="text"
                                        placeholder="Search profiles..."
                                        className="pl-9 sm:w-64 rounded-[0.5rem]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-auto xl:overflow-visible">
                            <Table className="border-b border-slate-200/60">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Td className="w-5 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                            <FormCheck.Input type="checkbox" />
                                        </Table.Td>
                                        <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                            INFOR
                                        </Table.Td>
                                        <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                            ISCONNECTED
                                        </Table.Td>
                                        <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                            ISMESSAGED
                                        </Table.Td>
                                        <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                            ISREPLIED
                                        </Table.Td>
                                        <Table.Td className="py-4 font-medium text-center border-t w-36 bg-slate-50 border-slate-200/60 text-slate-500">
                                            ACTION
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {profiles.map(
                                        (profile, id) => (
                                            <Table.Tr
                                                key={id}
                                                className="[&_td]:last:border-b-0"
                                            >
                                                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                                    <FormCheck.Input type="checkbox" />
                                                </Table.Td>
                                                <Table.Td className="py-4 border-dashed w-44 dark:bg-darkmode-600">
                                                    <div className="flex items-center">
                                                        <div className="w-9 h-9 image-fit zoom-in">
                                                            <Tippy
                                                                as="img"
                                                                alt="Tailwise - Admin Dashboard Template"
                                                                className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                                                                src={profile.img_url}
                                                                content={profile.first_name + ' ' + profile.last_name}
                                                            />
                                                        </div>
                                                        <div className="ml-3.5 flex flex-col gap-y-1">
                                                            <div className="flex text-slate-500 text-xs whitespace-nowrap mt-0.5 font-bold">
                                                                {profile.first_name + " " + profile.last_name}
                                                            </div>
                                                            <div className="flex text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                                                {profile.role}
                                                            </div>
                                                            <a href="" className="flex items-center text-primary">
                                                                <Lucide
                                                                    icon="ExternalLink"
                                                                    className="w-3.5 h-3.5 stroke-[1.7]"
                                                                />
                                                                <div className="ml-1.5 text-[13px] whitespace-nowrap underline decoration-dotted decoration-primary/30 underline-offset-[3px]">
                                                                    {profile.link}
                                                                </div>
                                                            </a>
                                                        </div>

                                                    </div>
                                                </Table.Td>
                                                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                                    <div
                                                        className={clsx([
                                                            "flex items-center",
                                                            // faker.orderStatus.textColor,
                                                        ])}
                                                    >
                                                        {/* <Lucide
                                                            icon={faker.orderStatus.icon}
                                                            className="w-3.5 h-3.5 stroke-[1.7]"
                                                        /> */}
                                                        <div className="ml-1.5 whitespace-nowrap">
                                                            {profile.isconnected ? "YES" : "NO"}
                                                        </div>
                                                    </div>
                                                </Table.Td>
                                                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                                    <div className="whitespace-nowrap">
                                                        {profile.ismessage ? "YES" : "NO"}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                                                    <div className="whitespace-nowrap">
                                                        {profile.isreplied ? "YES" : "NO"}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td className="relative py-4 border-dashed dark:bg-darkmode-600">
                                                    <div className="flex items-center justify-center">
                                                        <Menu className="h-5">
                                                            <Menu.Button className="w-5 h-5 text-slate-500">
                                                                <Lucide
                                                                    icon="MoreVertical"
                                                                    className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                                                                />
                                                            </Menu.Button>
                                                            <Menu.Items className="w-40">
                                                                <Menu.Item>
                                                                    <Lucide
                                                                        icon="CheckSquare"
                                                                        className="w-4 h-4 mr-2"
                                                                    />{" "}
                                                                    Edit
                                                                </Menu.Item>
                                                                <Menu.Item className="text-danger">
                                                                    <Lucide
                                                                        icon="Trash2"
                                                                        className="w-4 h-4 mr-2"
                                                                    />
                                                                    Delete
                                                                </Menu.Item>
                                                            </Menu.Items>
                                                        </Menu>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                        )
                                    )}
                                </Table.Tbody>
                            </Table>
                        </div>
                        <Pagination currentPage={currentPage} pageCount={pageCount} rowsPerPage={rowsPerPage}
                            setCurrentPage={setCurrentPage} setPageCount={setPageCount} setRowsPerPage={setRowsPerPage} />
                    </div>
                </div>
            </div>
            <Dialog size="2xl" open={isProfileSearch} onClose={() => {
                setIsProfileSearch(false);
            }}
            >
                <Dialog.Panel className="p-10 text-center">
                    <ProfileSearch refreshProfiles={handleProfiles} />
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}

export default Main;
