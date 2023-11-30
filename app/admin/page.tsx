import MemberChart from '../component/admin/chart/memberchart';
import OsCom from '../component/admin/chart/oschart';
import PlatformCom from '../component/admin/chart/platformchart';
import VisitChart from '../component/admin/chart/visitchart';
import NewMember from '../component/admin/chart/newmember';
import NewPost from '../component/admin/chart/newpost';
import TotalCount from '../component/admin/chart/totalcount';







export default function Admin(){
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