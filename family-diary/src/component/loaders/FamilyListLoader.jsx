import ListSkeleton from './skeletonComponent/ListSkeleton'

const FamilyListLoader = () => {
  return (
     <div className="h-screen w-screen flex flex-col ">
        <div className="h-full flex flex-col ">
           <ListSkeleton withIcon={false} isDouble = {true}/>
           <ListSkeleton withIcon={false} isDouble = {true}/>
           <ListSkeleton withIcon={false} isDouble = {true}/>
           <ListSkeleton withIcon={false} isDouble = {true}/>
           <ListSkeleton withIcon={false} isDouble = {true}/>
        </div>
    </div>
  )
}

export default FamilyListLoader