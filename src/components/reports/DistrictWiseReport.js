import React, { useEffect, useState } from "react";
import commonAxios from "../../axios/CommonAxios";
import ApiUrls from "../../API-urls/api-urls";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const DistrictWiseReport = () => {

    const [distReport, setDistReport] = useState([]);
    const [distDrillReport, setDistDrillReport] = useState([]);
    const [distReportBack, setDistReportBack] = useState(false);
    const [distDrillReportBack, setDistDrillReportBack] = useState(false);
    const [distname, setDistName] = useState('');

    const navigate = useNavigate();

    const getDistReport = async () => {
        // console.log("report");

        await commonAxios.get(ApiUrls.contextURL + "distWiseReport").then((res) => {

            if (res.data.success === true) {
                // console.log("API Response:", res.data.data);
                setDistReport(res.data.data);
                setDistReportBack(true);
            }
            else {
                setDistReport([]);
            }
        })
    }

    useEffect(() => {
        getDistReport();
    }, []);

    const getDistDrillReport = async (distCode, distName) => {
        // console.log("report");

        await commonAxios.get(ApiUrls.contextURL + "distDrillReport?distCode=" + distCode).then((res) => {

            if (res.data.success === true) {
                // console.log("API Response:", res.data.data);
                setDistDrillReport(res.data.data);
                setDistReportBack(false);
                setDistDrillReportBack(true);
                setDistName(distName);
            }
            else {
                setDistDrillReport([]);
            }
        })
    }

    const total = distReport.reduce((sum, item) => sum + Number(item.appl_count), 0);
    console.log("total", total);

    const columns = React.useMemo(
        () => [
            {
                header: "Sno",
                cell: ({ row }) => row.index + 1,
                footer: "Total"
            },
            {
                header: "District Name",
                accessorKey: "dist_name",
                cell: ({ row }) => (
                    <span style={{ cursor: "pointer", color: 'blue', textDecoration: 'underline' }}
                        onClick={() => getDistDrillReport(row.original.dist_code, row.original.dist_name)}>
                        {row.original.dist_name}

                    </span>
                )
            },
            {
                header: "Application Count",
                accessorKey: "appl_count",
                footer: () => total
            },
        ],
        [total]
    );

    const table = useReactTable({
        data: distReport,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    //   console.log("Header Groups", table.getHeaderGroups());
    // console.log("Rows", table.getRowModel().rows);

    const handleBack1 = () => {
        navigate("/home")
    }

    const handleBack2 = () => {
        setDistReportBack(true);
        setDistDrillReportBack(false);
    }

    return (
        <>
            {distReportBack &&
                <div className="container border d-flex flex-column align-items-center mt-5 ">
                    <h5 className="mt-3">District Wise Report</h5>
                    <div className="w-100 d-flex justify-content-end mt-3">
                        <button
                            type="button"
                            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                            onClick={handleBack1}
                        >
                            Back
                        </button>
                    </div>
                    <table border="1" cellPadding="10" className="mt-3 mb-4 table table-bordered">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} style={{ textAlign: "center" }}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            {table.getFooterGroups().map((footerGroup) => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map((header) => (
                                        <td key={header.id}>
                                            {flexRender(header.column.columnDef.footer, header.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>

                    </table>

                </div>}
            {distDrillReportBack && (

                <div className="border container d-flex  flex-column align-items-center mt-5">
                    <h5 className="mt-3">{distname} District Report</h5>
                    <div className="w-100 d-flex justify-content-end mt-3">
                        <button
                            type="button"
                            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                            onClick={handleBack2}
                        >
                            Back
                        </button>
                    </div>
                    {distDrillReport.length > 0 ? (
                        <div className=" container mt-3 mb-2">
                            <table className="table table-bordered mt-3">
                                <thead className="table-light mt-3 text-center">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Aadhar</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {distDrillReport.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.mobile}</td>
                                            <td>{user.uid}</td>
                                            <td>{user.email}</td>
                                            <td>{`${user.dist_name}, ${user.mandal_name}, ${user.village_name}, ${user.street}, ${user.door_no} - ${user.pin_code}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (<center className="mt-4 text-danger">---No Data Found---</center>)}
                </div>
            )}

        </>
    );
}
export default DistrictWiseReport;