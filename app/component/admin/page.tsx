import MemberChart from '../components/admin/chart/memberchart';
import OsCom from '../components/admin/chart/oschart';
import PlatformCom from '../components/admin/chart/platformchart';
import VisitChart from '../components/admin/chart/visitchart';
import NewMember from '../components/admin/main/newmember';
import NewPost from '../components/admin/main/newpost';
import TotalCount from '../components/admin/main/totalcount';







export default async function Admin(){
  return(
    <>
     <TotalCount/>   
     <div className="w-full my-5 flex flex-wrap justify-between">
        <NewMember/>
        <NewPost/>
     </div>
     <div className="w-full my-5 flex flex-wrap justify-between">
      <MemberChart/>
      <VisitChart/>
     </div>
     <div className="w-full my-5 flex flex-wrap justify-between">
      <OsCom/>
      <PlatformCom/>
     </div>
    </>
  )
}