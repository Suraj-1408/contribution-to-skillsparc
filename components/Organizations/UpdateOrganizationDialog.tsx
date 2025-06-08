import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateOrganization } from "@/api/organizationAPI";
import { Organization } from "@/types";

interface UpdateOrganizationDialogProps {
  organization: Organization;
  onUpdate: (updatedOrg: Organization) => void;
}

const UpdateOrganizationDialog: React.FC<UpdateOrganizationDialogProps> = ({
  organization,
  onUpdate,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(organization.name);
  const [email, setEmail] = useState(organization.organization_admin_email || "");

  const handleSubmit = async () => {
    try {

      console.log("🧪 Final Payload:", {
        id: organization._id,
        name,
        organization_admin_email: email,
      });

      const updated = await updateOrganization({
        id: organization._id,
        name,
        organization_admin_email: email,

      });

      toast({
        title: "Updated",
        description: "Organization updated successfully.",
      });

      onUpdate(updated);
      setOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error?.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Organization</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Organization</DialogTitle>
          <DialogDescription>
            Edit the organization name and admin email, then click "Update".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            placeholder="Organization Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrganizationDialog;
