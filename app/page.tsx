"use client";
import { ChangeEvent, useState } from "react";

interface txtScan {
  id: number;
  name: string;
}

interface txtPartList {
  id: number;
  code: string;
  no: string;
  name: string;
  qty: number;
}

export default function Home() {
  const [txtScan, setTxtScan] = useState("");
  const [txtPoNo, setTxtPoNo] = useState("");
  const [txtInvNo, setTxtInvNo] = useState("");
  const [scanList, setScanList] = useState<txtScan[]>([]);
  const [partList, setPartList] = useState<txtPartList[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTxtScan(e.target.value);
  };

  function handleKeyDown(e: React.KeyboardEvent): any {
    console.dir(e.key);
    if (e.key === "Enter") {
      if (scanList.length == 0) {
        setTxtPoNo(txtScan);
      } else if (scanList.length == 1) {
        setTxtInvNo(txtScan);
      } else if (scanList.length > 1) {
        setPartList([
          ...partList,
          {
            id: partList.length + 1,
            code: txtScan,
            no: txtScan,
            name: txtScan,
            qty: 20,
          },
        ]);
      }
      setScanList([...scanList, { id: scanList.length + 1, name: txtScan }]);
      setTxtScan("");
    }
  }

  return (
    <div className="p-4">
      <div className="card w-full min-w-full bg-base-100 card-xs shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-between">
            <div className="justify-start">Receive Invoice</div>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Save</button>
            </div>
          </h2>
          <div className="p-4 max-w-full w-full">
            <input
              name="txtScan"
              type="text"
              autoFocus
              placeholder="Scan QR-Code"
              className="input w-full"
              value={txtScan}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className=" max-w-full pt-2">
              <div className="flex justify-between">
                <div>
                  PO: <strong>{txtPoNo}</strong>
                </div>
                <div>
                  INV: <strong>{txtInvNo}</strong>
                </div>
                <div>
                  CTN: <strong>{partList.length}</strong>
                </div>
              </div>
              <ul className="menu bg-base-200 rounded-box max-w-full w-full">
                {partList
                  ? partList.map((i) => (
                      <li key={i.id}>
                        <a>
                          PartNo: <strong>{i.no}</strong> Qty:{" "}
                          <strong>{i.qty}</strong>
                        </a>
                      </li>
                    ))
                  : []}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
