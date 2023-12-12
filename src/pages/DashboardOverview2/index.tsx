import { useState } from 'react';
import Lucide from '../../base-components/Lucide';
import { Menu } from '../../base-components/Headless';
import users from '../../fakers/users';
import projects from '../../fakers/projects';
import projectDetails from '../../fakers/project-details';
import { FormSelect, FormInput, FormCheck } from '../../base-components/Form';
import { Dialog } from '../../base-components/Headless';
import Tippy from '../../base-components/Tippy';
import Button from '../../base-components/Button';
import LoadingIcon from '../../base-components/LoadingIcon';
import { Tab } from '../../base-components/Headless';
import _ from 'lodash';

function Main() {
  const [pageSaved, setPageSaved] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="flex flex-col col-span-12 xl:col-span-12 gap-y-10">
        <div className="p-5 mt-3.5 box box--stacked">
          <div className="relative">
            <FormInput
              type="text"
              className="py-3 pr-11"
              rounded
              placeholder="Search members..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-10 my-1 mr-1 rounded-full bg-primary">
              <Lucide
                icon="Search"
                className="stroke-[1.3] w-4 h-4 text-white"
              />
            </div>
          </div>
          <div className='flex mt-5 col-span-12 xl:col-span-12'>
            <div className='flex items-center justify-end w-full'>
              <FormCheck.Input
                className="border"
                type="checkbox"
                checked={pageSaved}
                onChange={(e: any) => { setPageSaved(e.target.checked) }}
              />
              <div className="ml-3 mr-3 text-xs text-slate-500">
                10 selected
              </div>
              <Button className='mr-3' variant="primary" disabled={!pageSaved}>
                SAVE
              </Button>
              <Button className='mr-3' variant="primary" >
                ALL SAVE
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {_.take(projectDetails.fakeProjectDetails(), 6).map(
              (faker, fakerKey) => (
                <div
                  className="relative flex flex-col items-center gap-5 p-3 border border-dashed rounded-lg sm:flex-row border-slate-300/60"
                  key={fakerKey}
                >
                  <div className="mr-3">
                    <FormCheck.Input
                      className="border"
                      type="checkbox"
                      checked={[true, false][_.random(0, 1)]}
                      onChange={() => { }}
                    />
                  </div>
                  <div>
                    <div className="w-24 h-24 rounded-full overflow-hidden image-fit border-[3px] border-slate-200/70">
                      <img
                        alt="Tailwise - Admin Dashboard Template"
                        className="rounded-md"
                        src={faker.image}
                      />
                    </div>
                  </div>
                  <div className="-mt-1">
                    <a
                      href=""
                      className="block font-medium text-center sm:text-left"
                    >
                      {faker.title}
                    </a>
                    <div className="flex items-center mt-2.5 text-xs text-slate-500 dark:text-slate-500">
                      <Lucide
                        icon="Link"
                        className="w-2.5 h-2.5 mr-1.5 stroke-[2]"
                      />
                      <a
                        href=""
                        className="truncate underline decoration-dotted underline-offset-[3px] decoration-slate-300"
                      >
                        {faker.link}
                      </a>
                    </div>
                    <div className="flex items-center justify-center mt-4 sm:justify-start">
                      <div className="flex">
                        <div className="w-6 h-6 image-fit zoom-in">
                          <Tippy
                            as="img"
                            alt="Tailwise - Admin Dashboard Template"
                            className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            src={faker.contributors[0].photo}
                            content={faker.contributors[0].name}
                          />
                        </div>
                        <div className="w-6 h-6 -ml-2.5 image-fit zoom-in">
                          <Tippy
                            as="img"
                            alt="Tailwise - Admin Dashboard Template"
                            className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            src={faker.contributors[1].photo}
                            content={faker.contributors[1].name}
                          />
                        </div>
                        <div className="w-6 h-6 -ml-2.5 image-fit zoom-in">
                          <Tippy
                            as="img"
                            alt="Tailwise - Admin Dashboard Template"
                            className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            src={faker.contributors[2].photo}
                            content={faker.contributors[2].name}
                          />
                        </div>
                      </div>
                      <div className="ml-3 text-xs text-slate-500">
                        4+ Members
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button variant="primary">
                      Save
                    </Button>
                    {/* <Button variant="primary">
                      Saving
                      <LoadingIcon
                        icon="oval"
                        color="white"
                        className="w-4 h-4 ml-2"
                      />
                    </Button> */}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

