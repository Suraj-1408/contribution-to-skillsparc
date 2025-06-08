/*
import React from "react";
import { Organization } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Folders, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {

  const { _id, name, logo, adminEmail, departmentCount, courseCount, userCount, createdAt } = organization;

  
  const createdDate = new Date(createdAt);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });
  

  // Generate a gradient color based on the organization id
  const gradientColors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-amber-500 to-orange-400",
    "from-emerald-500 to-teal-400",
    "from-indigo-500 to-sky-400",
    "from-rose-500 to-red-400",
  ];
  
  const gradientIndex = parseInt(_id) % gradientColors.length;
  const gradient = gradientColors[gradientIndex];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-0 bg-white shadow">
      <div className={`h-3 bg-gradient-to-r ${gradient}`} />
      <div className="p-6 pt-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 shadow-sm ring-2 ring-white">
            <img src={logo} alt={name} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="text-xl font-bold line-clamp-1">{name}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{adminEmail}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Users className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-lg font-bold">{userCount}</span>
            <span className="text-xs text-gray-500">Employees</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Folders className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-lg font-bold">{departmentCount}</span>
            <span className="text-xs text-gray-500">Departments</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-lg font-bold">{courseCount}</span>
            <span className="text-xs text-gray-500">Courses</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            Created {timeAgo}
          </div>
          <Button asChild variant="ghost" className="group hover:bg-gradient-to-r hover:from-brand-500 hover:to-brand-600 hover:text-white">
            <Link to={`/organization/${_id}`} className="flex items-center gap-1">
              <span>View</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationCard;
*/

import React from "react";
import { Organization } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Folders, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
  const {
    _id,
    name,
    logo_url,
    organization_admin_email,
    statistics,
    createdAt,
  } = organization;

  // fallback for missing fields
  const logo = logo_url || "/default-logo.png"; // use default logo if missing
  const adminEmail = organization_admin_email || "Not Provided";

  const userCount = statistics?.totalEmployees ?? 0;
  const departmentCount = statistics?.totalDepartments ?? 0;
  const courseCount = statistics?.totalCourses ?? 0;

  const createdDate = createdAt ? new Date(createdAt) : null;
  const timeAgo =
    createdDate && !isNaN(createdDate.getTime())
      ? formatDistanceToNow(createdDate, { addSuffix: true })
      : "Unknown";

  const gradientColors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-amber-500 to-orange-400",
    "from-emerald-500 to-teal-400",
    "from-indigo-500 to-sky-400",
    "from-rose-500 to-red-400",
  ];

  const gradientIndex = parseInt(_id.slice(-2), 16) % gradientColors.length; // safer parsing
  const gradient = gradientColors[gradientIndex];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-0 bg-white shadow">
      <div className={`h-3 bg-gradient-to-r ${gradient}`} />
      <div className="p-6 pt-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 shadow-sm ring-2 ring-white">
            <img src={logo} alt={name} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="text-xl font-bold line-clamp-1">{name}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{adminEmail}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Users className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-lg font-bold">{userCount}</span>
            <span className="text-xs text-gray-500">Employees</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Folders className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-lg font-bold">{departmentCount}</span>
            <span className="text-xs text-gray-500">Departments</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-lg font-bold">{courseCount}</span>
            <span className="text-xs text-gray-500">Courses</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">Created {timeAgo}</div>
          <Button
            asChild
            variant="ghost"
            className="group hover:bg-gradient-to-r hover:from-brand-500 hover:to-brand-600 hover:text-white"
          >
            <Link to={`/organization/${_id}`} className="flex items-center gap-1">
              <span>View</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationCard;
