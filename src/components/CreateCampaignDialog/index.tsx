import { useState } from "react";
import { ArrowRight, ChevronLeft, StarIcon } from "lucide-react";

import _ from "lodash";
import clsx from 'clsx';

import { Slideover } from "../../base-components/Headless"
import { FormLabel, FormInput } from "../../base-components/Form";
import Button from "../../base-components/Button";

interface ICreateCampaignDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

const initialSteps = [
    {
        step: 1,
        name: 'Create campaign',
        children: [
            {
                name: 'Details'
            },
            {
                name: 'Add Profile'
            },
            {
                name: 'Review'
            },
            {
                name: 'Configure'
            },
            {
                name: 'Sequence'
            }
        ]
    },
    {
        step: 2,
        name: 'Start campaign',
    }
]

const initialUserCards = [
    {
        avatar: 'AI',
        title: 'Create campaign using SalesGPT',
        description: 'Start with our powerful + proven template',
        brand: true
    },
    {
        avatar: '',
        title: "I'm an advanced user",
        description: '',
        advanced: true
    },
]

function Main({
    open,
    onClose,
    onCreate
}: ICreateCampaignDialogProps) {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [currentSubStep, setCurrentSubStep] = useState<number>(0);
    const [campaignName, setCampaignName] = useState('');

    const onNextSubStep = () => {
        setCurrentSubStep(currentSubStep + 1);
    }

    const onPrevSubStep = () => {
        if (currentStep === 0) return;
        setCurrentStep(currentStep - 1);
    }

    const onNextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const onCampaignCreate = () => {
        onCreate(campaignName);
        setCurrentStep(1);
        setCampaignName('');
    }

    return <Slideover
        open={open}
        onClose={onClose}
        size='2xl'
    >
        <Slideover.Panel>
            <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">
                    Create Campaign
                </h2>
            </Slideover.Title>
            <Slideover.Description>
                <div className="py-10 flex gap-x-6">
                    <div className="flex flex-col gap-y-5 relative shrink-0 basis-[250px]">
                        {
                            initialSteps.map((step: any, index: number) =>
                                <div key={`step-${index}`} className="space-y-4">
                                    <div className="flex gap-x-4 items-center">
                                        <span className={clsx("w-4 h-4 rounded-full flex items-center justify-center text-white", currentStep === step.step ? 'bg-blue-700' : 'bg-gray-500')}>{step.step}</span>
                                        <p className="font-bold">{step.name}</p>
                                    </div>
                                    {
                                        step.children && <div className="flex flex-col gap-y-4 rounded-full">
                                            {
                                                step.children.map((child: any, index: number) => <div key={`step-child-${index}`} className="flex gap-x-4 items-center">
                                                    <div className="w-4 flex justify-center">
                                                        <span className={clsx("w-2 h-2 rounded-full", currentSubStep === index + 1 ? 'bg-blue-700' : 'bg-gray-500')}></span>
                                                    </div>
                                                    <p>{child.name}</p>
                                                </div>)
                                            }
                                        </div>
                                    }
                                </div>
                            )
                        }
                        {/* <div className="absolute left-0 h-full w-4 bg-gray-200 rounded-full z-0" /> */}
                    </div>
                    <div className="grow flex flex-col">
                        {
                            !(currentStep === 1 && currentSubStep === 0) && <div className="flex gap-x-1 items-center cursor-pointer" onClick={onPrevSubStep}>
                                <span><ChevronLeft size={16} stroke="rgb(156 163 175" /></span>
                                <p className="text-gray-400">Back</p>
                            </div>
                        }
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 h-fit">
                            {
                                currentStep === 1 && currentSubStep === 0 && initialUserCards.map(user =>
                                    <div
                                        key={`user-card-${user.title}`}
                                        className="bg-white shadow-md rounded-xl relative p-6 flex flex-col gap-y-4 w-full hover:shadow-xl cursor-pointer"
                                        onClick={onNextStep}
                                    >
                                        {
                                            user.brand && <div className="absolute right-0 top-0 py-0.5 px-4 bg-emerald-100 flex gap-x-2 items-center">
                                                <span><StarIcon size={16} stroke="rgb(16, 185, 129)" fill="transparent" /></span>
                                                <p className="text-emerald-500 font-bold">New Feature</p>
                                            </div>
                                        }
                                        <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-violet-600 font-bold">{user.avatar}</span>
                                        <div className="space-y-2">
                                            <p className="font-bold">{user.title}</p>
                                            <p className="text-gray-500 text-sm">{user.description}</p>
                                        </div>
                                    </div>)
                            }
                            {
                                currentStep === 2 && <div className="py-8 space-y-8">
                                    <div>
                                        <h1 className="font-bold text-xl">Create campaign</h1>
                                        <p className="text-gray-400">What would you like to call this campaign?</p>
                                    </div>
                                    <div className="form">
                                        <FormLabel htmlFor="regular-form-1">Name</FormLabel>
                                        <FormInput id="regular-form-1" type="text" placeholder="My first campaign" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
                                        <Button variant="primary" disabled={campaignName === ''} className="w-20 mt-2 bg-blue-700 flex gap-x-1" onClick={onCampaignCreate}>
                                            Save
                                            <span><ArrowRight size={16} /></span>
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Slideover.Description>
        </Slideover.Panel>
    </Slideover>
}

export default Main;