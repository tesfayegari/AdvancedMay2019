import { Department } from "./Department";

export class Student{
  protected department: Department;
  constructor(private dept: Department){
    this.department = dept;
  }
}