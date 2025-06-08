import React, { useState } from "react";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateDepartmentById } from "@/api/departmentAPI";
import { useToast } from "@/components/ui/use-toast";

interface UpdateDepartmentDialogProps {
  department: any;
  onUpdate: (updated: any) => void;
}

const UpdateDepartmentDialog: React.FC<UpdateDepartmentDialogProps> = ({
  department,
  onUpdate,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(department.name);
  const [description, setDescription] = useState(department.description);

  const handleSubmit = async () => {
    try {
      const payload = {
        departmentId: department._id,
        name,
        description,
        adminId: "683b29ed7e154cbcff29dd47",
      };
      
      console.log("Data sent to udpate:", payload);

      const response = await updateDepartmentById(payload);

      toast({ title: "Success", description: "Department updated successfully." });
      onUpdate({ ...department, name, description });
      setOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Department</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>Update name and description.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDepartmentDialog;
