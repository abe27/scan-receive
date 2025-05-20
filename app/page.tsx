"use client";
import { ChangeEvent, useRef, useState } from "react";
import Swal from "sweetalert2";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [txtScan, setTxtScan] = useState("");
  const [txtPoNo, setTxtPoNo] = useState("");
  const [txtInvNo, setTxtInvNo] = useState("");
  const [txtKey, setTxtKey] = useState("");
  const [scanList, setScanList] = useState<txtScan[]>([]);
  const [partList, setPartList] = useState<txtPartList[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTxtScan(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent): any => {
    setTxtKey(e.key);
    if (e.key === "Enter") {
      if (txtScan.length > 0) {
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
      }
      setTxtScan("");
    }
  };

  const clearItem = () => {
    setTxtScan("");
    setTxtPoNo("");
    setTxtInvNo("");
    setScanList([]);
    setPartList([]);
    Swal.fire({
      title: "Successfully!",
      text: "Save Data Completed.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => window.location.reload());
  };

  return (
    <div className="p-4">
      <div className="card w-full min-w-full bg-base-100 card-xs shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-between">
            <div className="justify-start">
              Receive Invoice {txtKey == "Unidentified" ? "" : txtKey}
            </div>
            <div className="justify-end card-actions">
              <button className="btn btn-primary" onClick={clearItem}>
                Save
              </button>
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
              ref={inputRef}
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
