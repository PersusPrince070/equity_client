import { useEffect, useState } from "react";
import _ from "lodash";

import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";
import CampaignList from "../../components/CampaignList"
import Pagination from '../../components/Pagination';
import CreateCampaignDialog from '../../components/CreateCampaignDialog';

import { SERVER_URL } from "../../config";

function Main() {
  const [camAnchor, setCamAnchor] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadCampaignList = async () => {
    const response = await fetch(`${SERVER_URL}/campaigns?page=${currentPage}&pageSize=${rowsPerPage}`);
    const { campaigns, pageCount } = await response.json();
    if (campaigns) {
      setCampaigns(campaigns);
      setPageCount(Math.ceil(pageCount / rowsPerPage));
    }
  }

  const createCampaign = async (campaignName: string) => {
    const bodyJson = { name: campaignName };
    const response = await fetch(`${SERVER_URL}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyJson)
    });
    const result = await response.json();

    if (result) {
      setCampaigns([...campaigns, result]);
      setCamAnchor(false);
    }
  }

  useEffect(() => {
    loadCampaignList();
  }, [currentPage, rowsPerPage]);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Campaigns
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
              variant="primary"
              className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent  hover:opacity-70"
              onClick={() => setCamAnchor(true)}
            >
              <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />{" "}
              Add New Campaign
            </Button>
          </div>
        </div>

        <div className="mt-3.5">
          <div className="flex flex-col box box--stacked">
            <CampaignList list={campaigns} />
            <Pagination currentPage={currentPage} pageCount={pageCount} rowsPerPage={rowsPerPage}
              setCurrentPage={setCurrentPage} setPageCount={setPageCount} setRowsPerPage={setRowsPerPage} />
          </div>
        </div>
        <CreateCampaignDialog open={camAnchor} onClose={() => setCamAnchor(false)} onCreate={createCampaign} />
      </div>
    </div>
  );
}

export default Main;
