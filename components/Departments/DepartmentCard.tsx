/*
import React from "react";
import { Department } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface DepartmentCardProps {
  department: Department;
  organizationId?: string;
}

const colorVariants = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-indigo-400",
  "from-pink-500 to-rose-400",
  "from-amber-500 to-yellow-400",
  "from-emerald-500 to-green-400",
  "from-orange-500 to-amber-400",
  "from-teal-500 to-cyan-400",
  "from-fuchsia-500 to-pink-400"
];

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, organizationId }) => {
  const { id, name, description, courseCount, userCount, createdAt } = department;

  const colorIndex = parseInt(id, 10) % colorVariants.length;
  const gradientColor = colorVariants[colorIndex];

  const createdDate = new Date(createdAt);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className={`h-2 bg-gradient-to-r ${gradientColor}`} />
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-gray-500 mb-1" />
              <span className="text-lg font-medium">{userCount}</span>
              <span className="text-xs text-muted-foreground">Employees</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-5 w-5 text-gray-500 mb-1" />
              <span className="text-lg font-medium">{courseCount}</span>
              <span className="text-xs text-muted-foreground">Courses</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-5 pb-4">
        <div className="text-xs text-muted-foreground">
          Created {timeAgo}
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to={`/organization/${organizationId}/department/${id}`}>
            View <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DepartmentCard;
*/

import React from "react";
import { Department } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, ArrowRight,Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface DepartmentCardProps {
  department: Department;                                                                                                        
  organizationId?: string;
  onDelete?: (departmentId: string) => void; 

}

const colorVariants = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-indigo-400",
  "from-pink-500 to-rose-400",
  "from-amber-500 to-yellow-400",
  "from-emerald-500 to-green-400",
  "from-orange-500 to-amber-400",
  "from-teal-500 to-cyan-400",
  "from-fuchsia-500 to-pink-400"
];

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, organizationId, onDelete  }) => {
  // Use _id from API, fallback to id if it exists
  const departmentId = department._id || department.id;
  const { name, description, statistics } = department;

  // Use statistics from API response
  const courseCount = statistics?.totalCourses || 0;
  const userCount = statistics?.totalEmployees || 0;

  const colorIndex = parseInt(departmentId, 10) % colorVariants.length;
  const gradientColor = colorVariants[colorIndex];

  // Handle createdAt safely - check if it exists and is valid
  const getTimeAgo = () => {
    if (department.createdAt) {
      try {
        const createdDate = new Date(department.createdAt);
        if (!isNaN(createdDate.getTime())) {
          return formatDistanceToNow(createdDate, { addSuffix: true });
        }
      } catch (error) {
        console.warn("Invalid date format:", department.createdAt);
      }
    }
    return "Recently";
  };

  const timeAgo = getTimeAgo();

  const handleDeleteClick = () => {
    if (onDelete && confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      onDelete(departmentId);
    }
  };

  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-md">
      <div className={`h-2 bg-gradient-to-r ${gradientColor}`} />
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-gray-500 mb-1" />
              <span className="text-lg font-medium">{userCount}</span>
              <span className="text-xs text-muted-foreground">Employees</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-5 w-5 text-gray-500 mb-1" />
              <span className="text-lg font-medium">{courseCount}</span>
              <span className="text-xs text-muted-foreground">Courses</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-5 pb-4">
        <div className="text-xs text-muted-foreground">
          Created {timeAgo}
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to={`/organization/${organizationId}/department/${departmentId}`}>
            View <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button variant="destructive" size="sm" onClick={handleDeleteClick} className="absolute top-4 right-3 z-10">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
      </CardFooter>
    </Card>
  );
};

export default DepartmentCard;