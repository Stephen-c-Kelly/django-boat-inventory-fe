import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCat, deleteCat } from "../services/cats.js";
import catDetailAvatar from "../assets/cat-detail.png";

function CatDetail() {
  const [catDetail, setCatDetail] = useState({});

  let { catId } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    const fetchCat = async () => {
      const catData = await getCat(catId);
      setCatDetail(catData);
    };

    fetchCat();
  }, [catId]);

  const handleDelete = async () => {
    await deleteCat(catId)
    navigate('/cats')
  }

  // [TBU] Add Feedings Table
  // [TBU] Add Toys Table

  return (
    <div className="cat-detail-root">
      <div className="cat-detail-container">
        <img src={catDetailAvatar} alt="cat avatar" />
        <div>
          <h2>{catDetail?.cat?.name}</h2>
          <p>
            A {catDetail?.cat?.age} year old {catDetail?.cat?.breed} cat
          </p>
          <p>{catDetail?.cat?.description}</p>
          <div>
            <Link to={`/cats/${catDetail?.cat?.id}/edit`}>
              <button className="cat-detail-edit">Edit</button>
            </Link>
            <button className="cat-detail-delete" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatDetail;
