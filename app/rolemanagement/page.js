'use client';

import RolelistTable from './RolelistTable';
import {
  Link,
  DataTableSkeleton,
  Pagination,
  Column,
  Grid,
} from '@carbon/react';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { Octokit } from '@octokit/core';

//const octokitClient = new Octokit({});

const headers = [
  {
    key: 'role_type',
    header: 'RoleName',
  },
  {
    key: 'role_desc',
    header: 'RoleDescription',
  },
  {
    key: 'permissions_desc',
    header: 'RolePermissions',
  },
  {
    key: 'links',
    header: 'Operation',
  },
];

const LinkList = ({ url, homepageUrl }) => (
  <ul style={{ display: 'flex' }}>
    <li>
      <Link href={url}>Edit</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Delete</Link>
      </li>
    )}
  </ul>
);

const getRowItems = (rows) =>
  rows.map((row) => ({
    ...row,
    key: row.id,
    role_type: row.UserName,
    role_desc: row.Email,
    permissions_desc: row.Sn,
    links: <LinkList url={row.Email} homepageUrl={row.Email} />,
  }));

function RoleManagementPage() {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [roles, setRoles] = useState([]);



  useEffect(() => {
    async function getCarbonRolelist() {

      try {

        const response = await axios.get('/api/db-data-go/getUsers');
        console.log('API Response:', response.data); 
        const rolesData = Array.isArray(response.data) ? response.data : Object.values(response.data);
   
        if (rolesData[0] === 200) {

          setRoles(getRowItems(rolesData[1]));

        } else {
          setError('Error obtaining repository data');
        }

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }      

    }

    getCarbonRolelist();

  }, []);

 

  if (loading) {
    return (
      <Grid className="rolemanagement-page">
        <Column lg={16} md={8} sm={4} className="rolemanagement-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={10}
            headers={headers}
          />
        </Column>
      </Grid>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  return (
    <div align="right">
    <Grid className="rolemanagement-page">
      <Column lg={16} md={8} sm={4} className="rolemanagement-page__r1">
        <RolelistTable
          headers={headers}
          rows={roles.slice(firstRowIndex, firstRowIndex + currentPageSize)}
        />
        <Pagination
          totalItems={roles.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </Column>
    </Grid>
   </div>
  );
}

export default RoleManagementPage;
