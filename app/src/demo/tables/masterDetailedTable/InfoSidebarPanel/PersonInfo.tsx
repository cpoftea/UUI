import React from 'react';
import { Badge, EpamBadgeSemanticColor, ScrollBars } from '@epam/uui';
import { Person } from '@epam/uui-docs';
import { InfoRow } from './InfoRow';
import css from './InfoSidebarPanel.module.scss';

interface PersonInfoProps {
    data: Person;
}

const statusMap: Record<string, EpamBadgeSemanticColor> = {
    Red: 'critical',
    Amber: 'warning',
    Green: 'success',
};

export function PersonInfo({ data }: PersonInfoProps) {
    return (
        <ScrollBars>
            <InfoRow title="Name" value={ data.name } />
            <InfoRow title="Status" value={ <Badge cx={ css.status } caption={ data.profileStatus } color={ statusMap[data.profileStatus] } /> } />
            <InfoRow title="Job Title" value={ data.jobTitle } />
            <InfoRow title="Title Level" value={ data.titleLevel } />
            <InfoRow title="Office" value={ data.officeAddress } />
            <InfoRow title="City" value={ data.cityName } />
            <InfoRow title="Country" value={ data.countryName } />
            <InfoRow title="Manager" value={ data.managerName } />
            <InfoRow title="Hire date" value={ new Date(data.hireDate).toLocaleDateString() } />
            <InfoRow title="Related NPR" value={ data.relatedNPR ? 'Completed' : 'Uncompleted' } />
            <InfoRow title="Department" value={ data.departmentName } />
            <InfoRow title="Email" value={ data.email } />
            <InfoRow title="Modified" value={ new Date(data.modifiedDate).toLocaleDateString() } />
            <InfoRow title="Notes" value={ data.notes || '-' } />
            <InfoRow title="Primary skill" value={ data.primarySkill } />
            <InfoRow title="Production category" value={ data.productionCategory ? 'true' : 'false' } />
            <InfoRow title="UID" value={ data.uid } />
            <InfoRow title="Birth date" value={ new Date(data.birthDate).toLocaleDateString() } />
        </ScrollBars>
    );
}