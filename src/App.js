import React, { useEffect, useState } from "react";

import ShopTable from "./Data/ShopList";
import AddShop from "./Menu/AddShop";
import MenuBar from "./Menu/MenuBar";
import AddWard from "./Menu/AddWard";
import AddDistrict from "./Menu/AddDistrict";

function App() {
  const [shops, setShops] = useState([]);
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);

  const LOADING_PAGE_ID = -1;
  const MAIN_PAGE_ID = 0;
  const ADD_SHOP_ID = 1;
  const ADD_DISTRICT_ID = 2;
  const ADD_WARD_ID = 3;
  const [pageID, setPageId] = useState(LOADING_PAGE_ID);

  const load = async () => {
    try {
      const [s, d, w] = await Promise.all([
        fetch('https://api1.vominhduc.me/api/shops').then(rs => rs.json()),
        fetch('https://api1.vominhduc.me/api/districts').then(rd => rd.json()),
        fetch('https://api1.vominhduc.me/api/wards').then(rw => rw.json())
      ]);
      setShops(s);
      setDistricts(d);
      setWards(w);
    }
    catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    load().then(setPageId(MAIN_PAGE_ID));
  }, []);

  let confirmChanges = () => {
    load();
    setPageId(MAIN_PAGE_ID);
    console.log("confirmed changes");
  }

  let cancelChanges = () => {
    setPageId(MAIN_PAGE_ID);
    console.log("canceled changes");
  }

  let AddButton = () => {
    return (
      <div className="flex flex-col">
        <button onClick={(e) => { setPageId(ADD_SHOP_ID) }}>
          Thêm cửa hàng
        </button>
        <button onClick={(e) => { setPageId(ADD_DISTRICT_ID) }}>
          Thêm quận
        </button>
        <button onClick={(e) => { setPageId(ADD_WARD_ID) }}>
          Thêm phường
        </button>
      </div>
    )
  }

  switch (pageID) {
    case ADD_SHOP_ID:
      return (
        <div className="flex flex-col">
          <MenuBar />
          <AddShop
            onConfirm={() => confirmChanges()}
            onCancel={() => cancelChanges()}
          />
        </div>
      );
    case ADD_DISTRICT_ID:
      return (
        <div className="flex flex-col">
          <MenuBar />
          <AddDistrict
            onConfirm={() => confirmChanges()}
            onCancel={() => cancelChanges()}
          />
        </div>
      );
    case ADD_WARD_ID:
      return (
        <div className="flex flex-col">
          <MenuBar />
          <AddWard
            onConfirm={() => confirmChanges()}
            onCancel={() => cancelChanges()}
          />
        </div>
      );
    case MAIN_PAGE_ID:
      return (
        <div className="flex flex-col">
          <MenuBar />
          <ShopTable
            shops={shops}
            districts={districts}
            wards={wards}
          />
          <button>GAY</button>
          <AddButton />
        </div>
      );
    default:
      return (
        <div>
          <h1 className="loading title-font">Đang tải...</h1>
        </div>
      );
  }

}

export default App;
