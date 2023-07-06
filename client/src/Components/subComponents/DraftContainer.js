import "../../Assets/Styles/draftContainer.css";
import { useAuth } from "../../Hooks/useProvideAuth";
import DraftItem from "./DraftItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const DraftContainer = (props) => {
  // const auth = useAuth();
  // const user = JSON.parse(auth.user);

  const userData = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user);
  const {delete1,setDelete1,draft} = props;

  // useEffect(()=>{
  //   const getDraft = ()=>{

  //   }
  //   getDraft();
  // },[])

  // let draft = userData?.draft;

  // // if(userData.draft) {
  // //   draft = userData.draft;
  // // }

  return (
    <div className="draftContainer">
      {draft && (
        <>
          {draft.map((item) => (
            <DraftItem item={item} key={item.code} delete1={delete1} setDelete1={setDelete1} />
          ))}
        </>
      )}
    </div>
  );
};

export default DraftContainer;
