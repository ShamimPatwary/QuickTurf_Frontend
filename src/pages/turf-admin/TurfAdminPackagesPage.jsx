import React, { useEffect, useState } from "react";
import TurfAdminLayout from "./TurfAdminLayout";
import Loader from "../../components/common/Loader";
import PackageTable from "../../components/turf-admin/PackageTable";
import { createPackage, listPackages, deletePackage, listSports } from "../../api/turfAdminApi";

export default function TurfAdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const loadPackages = () => {
    setLoading(true);
    Promise.all([listPackages(), listSports()])
      .then(([packagesRes, sportsRes]) => {
        setPackages(packagesRes.data);
        setSports(sportsRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => 