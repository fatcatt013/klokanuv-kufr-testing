import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface Assessment {
            id?: number;
            task: string;
            child: number;
            option: number;
            date_of_assessment: string; // date
            note?: string | null;
            assessed_by?: string;
        }
        export interface AssessmentType {
            id?: number;
            label: string;
            allows_note?: boolean;
            options?: {
                id?: number;
                label: string;
            }[];
            url?: string;
        }
        export interface Category {
            id?: number;
            label: string;
            subcategories: number[];
            url?: string;
        }
        export interface Child {
            id?: number;
            first_name: string;
            last_name: string;
            birthdate: string; // date
            gender: "M" | "F";
            notes: number[];
            url?: string;
        }
        export interface ChildNote {
            id?: number;
            child: number;
            note: string;
            created_by?: string;
            updated_by?: string;
        }
        export interface Classroom {
            id?: number;
            label: string;
            school: number;
            children: number[];
            notes: number[];
            url?: string;
        }
        export interface ClassroomNote {
            id?: number;
            classroom: number;
            note: string;
            created_by?: string;
            updated_by?: string;
        }
        export interface School {
            id?: number;
            name: string;
            address?: string;
            url?: string;
        }
        export interface Subcategory {
            id?: number;
            label: string;
            url?: string;
        }
        export interface Task {
            id: number;
            parent_task?: string | null;
            subcategory?: null | number;
            codename?: string | null;
            assessment_type: number;
            task_description: string;
            difficulty?: "-" | "=" | "+";
            expected_age_from?: string | null; // decimal
            expected_age_to?: string | null; // decimal
            url?: string;
        }
        export interface TokenObtainPair {
            email: string;
            password: string;
        }
        export interface TokenRefresh {
            refresh: string;
            access?: string;
        }
        export interface User {
            id?: number;
            password: string;
            last_login?: string | null; // date-time
            /**
             * Designates that this user has all permissions without explicitly assigning them.
             */
            is_superuser?: boolean;
            first_name?: string;
            last_name?: string;
            /**
             * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
             */
            is_active?: boolean;
            date_joined?: string; // date-time
            email: string; // email
            /**
             * Designates whether the user can log into this admin site. Please leave this on unless really necessary.
             */
            is_staff?: boolean;
            school?: number;
            /**
             * The groups this user belongs to. A user will get all permissions granted to each of their groups.
             */
            groups?: number[];
            /**
             * Specific permissions for this user.
             */
            user_permissions?: number[];
        }
    }
}
declare namespace Paths {
    namespace CreateAssessment {
        export type RequestBody = Components.Schemas.Assessment;
        namespace Responses {
            export type $201 = Components.Schemas.Assessment;
        }
    }
    namespace CreateAssessmentType {
        export type RequestBody = Components.Schemas.AssessmentType;
        namespace Responses {
            export type $201 = Components.Schemas.AssessmentType;
        }
    }
    namespace CreateCategory {
        export type RequestBody = Components.Schemas.Category;
        namespace Responses {
            export type $201 = Components.Schemas.Category;
        }
    }
    namespace CreateChild {
        export type RequestBody = Components.Schemas.Child;
        namespace Responses {
            export type $201 = Components.Schemas.Child;
        }
    }
    namespace CreateChildNote {
        export type RequestBody = Components.Schemas.ChildNote;
        namespace Responses {
            export type $201 = Components.Schemas.ChildNote;
        }
    }
    namespace CreateClassroom {
        export type RequestBody = Components.Schemas.Classroom;
        namespace Responses {
            export type $201 = Components.Schemas.Classroom;
        }
    }
    namespace CreateClassroomNote {
        export type RequestBody = Components.Schemas.ClassroomNote;
        namespace Responses {
            export type $201 = Components.Schemas.ClassroomNote;
        }
    }
    namespace CreateSchool {
        export type RequestBody = Components.Schemas.School;
        namespace Responses {
            export type $201 = Components.Schemas.School;
        }
    }
    namespace CreateSubcategory {
        export type RequestBody = Components.Schemas.Subcategory;
        namespace Responses {
            export type $201 = Components.Schemas.Subcategory;
        }
    }
    namespace CreateTask {
        export type RequestBody = Components.Schemas.Task;
        namespace Responses {
            export type $201 = Components.Schemas.Task;
        }
    }
    namespace CreateTokenObtainPair {
        export type RequestBody = Components.Schemas.TokenObtainPair;
        namespace Responses {
            export type $201 = Components.Schemas.TokenObtainPair;
        }
    }
    namespace CreateTokenRefresh {
        export type RequestBody = Components.Schemas.TokenRefresh;
        namespace Responses {
            export type $201 = Components.Schemas.TokenRefresh;
        }
    }
    namespace CreateUser {
        export type RequestBody = Components.Schemas.User;
        namespace Responses {
            export type $201 = Components.Schemas.User;
        }
    }
    namespace DestroyAssessment {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyAssessmentType {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyCategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyChild {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyChildNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyClassroom {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyClassroomNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroySchool {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroySubcategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyTask {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DestroyUser {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ListAssessmentTypes {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.AssessmentType[];
            }
        }
    }
    namespace ListAssessments {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.Assessment[];
            }
        }
    }
    namespace ListCategorys {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.Category[];
            }
        }
    }
    namespace ListChildNotes {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.ChildNote[];
            }
        }
    }
    namespace ListChilds {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.Child[];
            }
        }
    }
    namespace ListClassroomNotes {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.ClassroomNote[];
            }
        }
    }
    namespace ListClassrooms {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.Classroom[];
            }
        }
    }
    namespace ListSchools {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.School[];
            }
        }
    }
    namespace ListSubcategorys {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.Subcategory[];
            }
        }
    }
    namespace ListTasks {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.Task[];
            }
        }
    }
    namespace ListUsers {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 123
                 */
                count?: number;
                /**
                 * example:
                 * http://api.example.org/accounts/?page=4
                 */
                next?: string | null; // uri
                /**
                 * example:
                 * http://api.example.org/accounts/?page=2
                 */
                previous?: string | null; // uri
                results?: Components.Schemas.User[];
            }
        }
    }
    namespace PartialUpdateAssessment {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Assessment;
        namespace Responses {
            export type $200 = Components.Schemas.Assessment;
        }
    }
    namespace PartialUpdateAssessmentType {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.AssessmentType;
        namespace Responses {
            export type $200 = Components.Schemas.AssessmentType;
        }
    }
    namespace PartialUpdateCategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Category;
        namespace Responses {
            export type $200 = Components.Schemas.Category;
        }
    }
    namespace PartialUpdateChild {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Child;
        namespace Responses {
            export type $200 = Components.Schemas.Child;
        }
    }
    namespace PartialUpdateChildNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ChildNote;
        namespace Responses {
            export type $200 = Components.Schemas.ChildNote;
        }
    }
    namespace PartialUpdateClassroom {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Classroom;
        namespace Responses {
            export type $200 = Components.Schemas.Classroom;
        }
    }
    namespace PartialUpdateClassroomNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ClassroomNote;
        namespace Responses {
            export type $200 = Components.Schemas.ClassroomNote;
        }
    }
    namespace PartialUpdateSchool {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.School;
        namespace Responses {
            export type $200 = Components.Schemas.School;
        }
    }
    namespace PartialUpdateSubcategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Subcategory;
        namespace Responses {
            export type $200 = Components.Schemas.Subcategory;
        }
    }
    namespace PartialUpdateTask {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Task;
        namespace Responses {
            export type $200 = Components.Schemas.Task;
        }
    }
    namespace PartialUpdateUser {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.User;
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace RetrieveAssessment {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Assessment;
        }
    }
    namespace RetrieveAssessmentType {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AssessmentType;
        }
    }
    namespace RetrieveCategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Category;
        }
    }
    namespace RetrieveChild {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Child;
        }
    }
    namespace RetrieveChildNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ChildNote;
        }
    }
    namespace RetrieveClassroom {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Classroom;
        }
    }
    namespace RetrieveClassroomNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ClassroomNote;
        }
    }
    namespace RetrieveSchool {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.School;
        }
    }
    namespace RetrieveSubcategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Subcategory;
        }
    }
    namespace RetrieveTask {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Task;
        }
    }
    namespace RetrieveUser {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace UpdateAssessment {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Assessment;
        namespace Responses {
            export type $200 = Components.Schemas.Assessment;
        }
    }
    namespace UpdateAssessmentType {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.AssessmentType;
        namespace Responses {
            export type $200 = Components.Schemas.AssessmentType;
        }
    }
    namespace UpdateCategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Category;
        namespace Responses {
            export type $200 = Components.Schemas.Category;
        }
    }
    namespace UpdateChild {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Child;
        namespace Responses {
            export type $200 = Components.Schemas.Child;
        }
    }
    namespace UpdateChildNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ChildNote;
        namespace Responses {
            export type $200 = Components.Schemas.ChildNote;
        }
    }
    namespace UpdateClassroom {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Classroom;
        namespace Responses {
            export type $200 = Components.Schemas.Classroom;
        }
    }
    namespace UpdateClassroomNote {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ClassroomNote;
        namespace Responses {
            export type $200 = Components.Schemas.ClassroomNote;
        }
    }
    namespace UpdateSchool {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.School;
        namespace Responses {
            export type $200 = Components.Schemas.School;
        }
    }
    namespace UpdateSubcategory {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Subcategory;
        namespace Responses {
            export type $200 = Components.Schemas.Subcategory;
        }
    }
    namespace UpdateTask {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Task;
        namespace Responses {
            export type $200 = Components.Schemas.Task;
        }
    }
    namespace UpdateUser {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.User;
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
}

export interface OperationMethods {
  /**
   * listTasks - API endpoint that allows tasks to be viewed or edited.
   */
  'listTasks'(
    parameters?: Parameters<Paths.ListTasks.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTasks.Responses.$200>
  /**
   * createTask - API endpoint that allows tasks to be viewed or edited.
   */
  'createTask'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTask.Responses.$201>
  /**
   * retrieveTask - API endpoint that allows tasks to be viewed or edited.
   */
  'retrieveTask'(
    parameters?: Parameters<Paths.RetrieveTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveTask.Responses.$200>
  /**
   * updateTask - API endpoint that allows tasks to be viewed or edited.
   */
  'updateTask'(
    parameters?: Parameters<Paths.UpdateTask.PathParameters> | null,
    data?: Paths.UpdateTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTask.Responses.$200>
  /**
   * partialUpdateTask - API endpoint that allows tasks to be viewed or edited.
   */
  'partialUpdateTask'(
    parameters?: Parameters<Paths.PartialUpdateTask.PathParameters> | null,
    data?: Paths.PartialUpdateTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateTask.Responses.$200>
  /**
   * destroyTask - API endpoint that allows tasks to be viewed or edited.
   */
  'destroyTask'(
    parameters?: Parameters<Paths.DestroyTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyTask.Responses.$204>
  /**
   * listSubcategorys - API endpoint that allows subcategories to be viewed or edited.
   */
  'listSubcategorys'(
    parameters?: Parameters<Paths.ListSubcategorys.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSubcategorys.Responses.$200>
  /**
   * createSubcategory - API endpoint that allows subcategories to be viewed or edited.
   */
  'createSubcategory'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSubcategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSubcategory.Responses.$201>
  /**
   * retrieveSubcategory - API endpoint that allows subcategories to be viewed or edited.
   */
  'retrieveSubcategory'(
    parameters?: Parameters<Paths.RetrieveSubcategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveSubcategory.Responses.$200>
  /**
   * updateSubcategory - API endpoint that allows subcategories to be viewed or edited.
   */
  'updateSubcategory'(
    parameters?: Parameters<Paths.UpdateSubcategory.PathParameters> | null,
    data?: Paths.UpdateSubcategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSubcategory.Responses.$200>
  /**
   * partialUpdateSubcategory - API endpoint that allows subcategories to be viewed or edited.
   */
  'partialUpdateSubcategory'(
    parameters?: Parameters<Paths.PartialUpdateSubcategory.PathParameters> | null,
    data?: Paths.PartialUpdateSubcategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateSubcategory.Responses.$200>
  /**
   * destroySubcategory - API endpoint that allows subcategories to be viewed or edited.
   */
  'destroySubcategory'(
    parameters?: Parameters<Paths.DestroySubcategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroySubcategory.Responses.$204>
  /**
   * listCategorys - API endpoint that allows categories to be viewed or edited.
   */
  'listCategorys'(
    parameters?: Parameters<Paths.ListCategorys.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCategorys.Responses.$200>
  /**
   * createCategory - API endpoint that allows categories to be viewed or edited.
   */
  'createCategory'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCategory.Responses.$201>
  /**
   * retrieveCategory - API endpoint that allows categories to be viewed or edited.
   */
  'retrieveCategory'(
    parameters?: Parameters<Paths.RetrieveCategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveCategory.Responses.$200>
  /**
   * updateCategory - API endpoint that allows categories to be viewed or edited.
   */
  'updateCategory'(
    parameters?: Parameters<Paths.UpdateCategory.PathParameters> | null,
    data?: Paths.UpdateCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateCategory.Responses.$200>
  /**
   * partialUpdateCategory - API endpoint that allows categories to be viewed or edited.
   */
  'partialUpdateCategory'(
    parameters?: Parameters<Paths.PartialUpdateCategory.PathParameters> | null,
    data?: Paths.PartialUpdateCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateCategory.Responses.$200>
  /**
   * destroyCategory - API endpoint that allows categories to be viewed or edited.
   */
  'destroyCategory'(
    parameters?: Parameters<Paths.DestroyCategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyCategory.Responses.$204>
  /**
   * listAssessmentTypes - API endpoint that allows assessment types to be viewed or edited.
   */
  'listAssessmentTypes'(
    parameters?: Parameters<Paths.ListAssessmentTypes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAssessmentTypes.Responses.$200>
  /**
   * createAssessmentType - API endpoint that allows assessment types to be viewed or edited.
   */
  'createAssessmentType'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAssessmentType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAssessmentType.Responses.$201>
  /**
   * retrieveAssessmentType - API endpoint that allows assessment types to be viewed or edited.
   */
  'retrieveAssessmentType'(
    parameters?: Parameters<Paths.RetrieveAssessmentType.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveAssessmentType.Responses.$200>
  /**
   * updateAssessmentType - API endpoint that allows assessment types to be viewed or edited.
   */
  'updateAssessmentType'(
    parameters?: Parameters<Paths.UpdateAssessmentType.PathParameters> | null,
    data?: Paths.UpdateAssessmentType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAssessmentType.Responses.$200>
  /**
   * partialUpdateAssessmentType - API endpoint that allows assessment types to be viewed or edited.
   */
  'partialUpdateAssessmentType'(
    parameters?: Parameters<Paths.PartialUpdateAssessmentType.PathParameters> | null,
    data?: Paths.PartialUpdateAssessmentType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateAssessmentType.Responses.$200>
  /**
   * destroyAssessmentType - API endpoint that allows assessment types to be viewed or edited.
   */
  'destroyAssessmentType'(
    parameters?: Parameters<Paths.DestroyAssessmentType.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyAssessmentType.Responses.$204>
  /**
   * listAssessments - API endpoint that allows assessments to be viewed or edited.
   */
  'listAssessments'(
    parameters?: Parameters<Paths.ListAssessments.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAssessments.Responses.$200>
  /**
   * createAssessment - API endpoint that allows assessments to be viewed or edited.
   */
  'createAssessment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAssessment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAssessment.Responses.$201>
  /**
   * retrieveAssessment - API endpoint that allows assessments to be viewed or edited.
   */
  'retrieveAssessment'(
    parameters?: Parameters<Paths.RetrieveAssessment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveAssessment.Responses.$200>
  /**
   * updateAssessment - API endpoint that allows assessments to be viewed or edited.
   */
  'updateAssessment'(
    parameters?: Parameters<Paths.UpdateAssessment.PathParameters> | null,
    data?: Paths.UpdateAssessment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAssessment.Responses.$200>
  /**
   * partialUpdateAssessment - API endpoint that allows assessments to be viewed or edited.
   */
  'partialUpdateAssessment'(
    parameters?: Parameters<Paths.PartialUpdateAssessment.PathParameters> | null,
    data?: Paths.PartialUpdateAssessment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateAssessment.Responses.$200>
  /**
   * destroyAssessment - API endpoint that allows assessments to be viewed or edited.
   */
  'destroyAssessment'(
    parameters?: Parameters<Paths.DestroyAssessment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyAssessment.Responses.$204>
  /**
   * listChildNotes - API endpoint that allows children notes to be viewed or edited.
   */
  'listChildNotes'(
    parameters?: Parameters<Paths.ListChildNotes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListChildNotes.Responses.$200>
  /**
   * createChildNote - API endpoint that allows children notes to be viewed or edited.
   */
  'createChildNote'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateChildNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateChildNote.Responses.$201>
  /**
   * retrieveChildNote - API endpoint that allows children notes to be viewed or edited.
   */
  'retrieveChildNote'(
    parameters?: Parameters<Paths.RetrieveChildNote.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveChildNote.Responses.$200>
  /**
   * updateChildNote - API endpoint that allows children notes to be viewed or edited.
   */
  'updateChildNote'(
    parameters?: Parameters<Paths.UpdateChildNote.PathParameters> | null,
    data?: Paths.UpdateChildNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateChildNote.Responses.$200>
  /**
   * partialUpdateChildNote - API endpoint that allows children notes to be viewed or edited.
   */
  'partialUpdateChildNote'(
    parameters?: Parameters<Paths.PartialUpdateChildNote.PathParameters> | null,
    data?: Paths.PartialUpdateChildNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateChildNote.Responses.$200>
  /**
   * destroyChildNote - API endpoint that allows children notes to be viewed or edited.
   */
  'destroyChildNote'(
    parameters?: Parameters<Paths.DestroyChildNote.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyChildNote.Responses.$204>
  /**
   * listClassroomNotes - API endpoint that allows classroom notes to be viewed or edited.
   */
  'listClassroomNotes'(
    parameters?: Parameters<Paths.ListClassroomNotes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListClassroomNotes.Responses.$200>
  /**
   * createClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
   */
  'createClassroomNote'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateClassroomNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateClassroomNote.Responses.$201>
  /**
   * retrieveClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
   */
  'retrieveClassroomNote'(
    parameters?: Parameters<Paths.RetrieveClassroomNote.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveClassroomNote.Responses.$200>
  /**
   * updateClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
   */
  'updateClassroomNote'(
    parameters?: Parameters<Paths.UpdateClassroomNote.PathParameters> | null,
    data?: Paths.UpdateClassroomNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClassroomNote.Responses.$200>
  /**
   * partialUpdateClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
   */
  'partialUpdateClassroomNote'(
    parameters?: Parameters<Paths.PartialUpdateClassroomNote.PathParameters> | null,
    data?: Paths.PartialUpdateClassroomNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateClassroomNote.Responses.$200>
  /**
   * destroyClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
   */
  'destroyClassroomNote'(
    parameters?: Parameters<Paths.DestroyClassroomNote.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyClassroomNote.Responses.$204>
  /**
   * listClassrooms - API endpoint that allows classrooms to be viewed or edited.
   */
  'listClassrooms'(
    parameters?: Parameters<Paths.ListClassrooms.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListClassrooms.Responses.$200>
  /**
   * createClassroom - API endpoint that allows classrooms to be viewed or edited.
   */
  'createClassroom'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateClassroom.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateClassroom.Responses.$201>
  /**
   * retrieveClassroom - API endpoint that allows classrooms to be viewed or edited.
   */
  'retrieveClassroom'(
    parameters?: Parameters<Paths.RetrieveClassroom.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveClassroom.Responses.$200>
  /**
   * updateClassroom - API endpoint that allows classrooms to be viewed or edited.
   */
  'updateClassroom'(
    parameters?: Parameters<Paths.UpdateClassroom.PathParameters> | null,
    data?: Paths.UpdateClassroom.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClassroom.Responses.$200>
  /**
   * partialUpdateClassroom - API endpoint that allows classrooms to be viewed or edited.
   */
  'partialUpdateClassroom'(
    parameters?: Parameters<Paths.PartialUpdateClassroom.PathParameters> | null,
    data?: Paths.PartialUpdateClassroom.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateClassroom.Responses.$200>
  /**
   * destroyClassroom - API endpoint that allows classrooms to be viewed or edited.
   */
  'destroyClassroom'(
    parameters?: Parameters<Paths.DestroyClassroom.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyClassroom.Responses.$204>
  /**
   * listChilds - API endpoint that allows children to be viewed or edited.
   */
  'listChilds'(
    parameters?: Parameters<Paths.ListChilds.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListChilds.Responses.$200>
  /**
   * createChild - API endpoint that allows children to be viewed or edited.
   */
  'createChild'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateChild.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateChild.Responses.$201>
  /**
   * retrieveChild - API endpoint that allows children to be viewed or edited.
   */
  'retrieveChild'(
    parameters?: Parameters<Paths.RetrieveChild.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveChild.Responses.$200>
  /**
   * updateChild - API endpoint that allows children to be viewed or edited.
   */
  'updateChild'(
    parameters?: Parameters<Paths.UpdateChild.PathParameters> | null,
    data?: Paths.UpdateChild.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateChild.Responses.$200>
  /**
   * partialUpdateChild - API endpoint that allows children to be viewed or edited.
   */
  'partialUpdateChild'(
    parameters?: Parameters<Paths.PartialUpdateChild.PathParameters> | null,
    data?: Paths.PartialUpdateChild.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateChild.Responses.$200>
  /**
   * destroyChild - API endpoint that allows children to be viewed or edited.
   */
  'destroyChild'(
    parameters?: Parameters<Paths.DestroyChild.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyChild.Responses.$204>
  /**
   * listUsers - API endpoint that allows users to be viewed or edited.
   */
  'listUsers'(
    parameters?: Parameters<Paths.ListUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUsers.Responses.$200>
  /**
   * createUser - API endpoint that allows users to be viewed or edited.
   */
  'createUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUser.Responses.$201>
  /**
   * retrieveUser - API endpoint that allows users to be viewed or edited.
   */
  'retrieveUser'(
    parameters?: Parameters<Paths.RetrieveUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveUser.Responses.$200>
  /**
   * updateUser - API endpoint that allows users to be viewed or edited.
   */
  'updateUser'(
    parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
    data?: Paths.UpdateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUser.Responses.$200>
  /**
   * partialUpdateUser - API endpoint that allows users to be viewed or edited.
   */
  'partialUpdateUser'(
    parameters?: Parameters<Paths.PartialUpdateUser.PathParameters> | null,
    data?: Paths.PartialUpdateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateUser.Responses.$200>
  /**
   * destroyUser - API endpoint that allows users to be viewed or edited.
   */
  'destroyUser'(
    parameters?: Parameters<Paths.DestroyUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroyUser.Responses.$204>
  /**
   * listSchools - API endpoint that allows schools to be viewed or edited.
   */
  'listSchools'(
    parameters?: Parameters<Paths.ListSchools.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSchools.Responses.$200>
  /**
   * createSchool - API endpoint that allows schools to be viewed or edited.
   */
  'createSchool'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSchool.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSchool.Responses.$201>
  /**
   * retrieveSchool - API endpoint that allows schools to be viewed or edited.
   */
  'retrieveSchool'(
    parameters?: Parameters<Paths.RetrieveSchool.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveSchool.Responses.$200>
  /**
   * updateSchool - API endpoint that allows schools to be viewed or edited.
   */
  'updateSchool'(
    parameters?: Parameters<Paths.UpdateSchool.PathParameters> | null,
    data?: Paths.UpdateSchool.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSchool.Responses.$200>
  /**
   * partialUpdateSchool - API endpoint that allows schools to be viewed or edited.
   */
  'partialUpdateSchool'(
    parameters?: Parameters<Paths.PartialUpdateSchool.PathParameters> | null,
    data?: Paths.PartialUpdateSchool.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateSchool.Responses.$200>
  /**
   * destroySchool - API endpoint that allows schools to be viewed or edited.
   */
  'destroySchool'(
    parameters?: Parameters<Paths.DestroySchool.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DestroySchool.Responses.$204>
  /**
   * createTokenObtainPair - Takes a set of user credentials and returns an access and refresh JSON web
   * token pair to prove the authentication of those credentials.
   */
  'createTokenObtainPair'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTokenObtainPair.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTokenObtainPair.Responses.$201>
  /**
   * createTokenRefresh - Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   */
  'createTokenRefresh'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTokenRefresh.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTokenRefresh.Responses.$201>
}

export interface PathsDictionary {
  ['/tasks/']: {
    /**
     * listTasks - API endpoint that allows tasks to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListTasks.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListTasks.Responses.$200>
    /**
     * createTask - API endpoint that allows tasks to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTask.Responses.$201>
  }
  ['/tasks/{id}/']: {
    /**
     * retrieveTask - API endpoint that allows tasks to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveTask.Responses.$200>
    /**
     * updateTask - API endpoint that allows tasks to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTask.PathParameters> | null,
      data?: Paths.UpdateTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTask.Responses.$200>
    /**
     * partialUpdateTask - API endpoint that allows tasks to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateTask.PathParameters> | null,
      data?: Paths.PartialUpdateTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateTask.Responses.$200>
    /**
     * destroyTask - API endpoint that allows tasks to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyTask.Responses.$204>
  }
  ['/subcategories/']: {
    /**
     * listSubcategorys - API endpoint that allows subcategories to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListSubcategorys.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSubcategorys.Responses.$200>
    /**
     * createSubcategory - API endpoint that allows subcategories to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSubcategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSubcategory.Responses.$201>
  }
  ['/subcategories/{id}/']: {
    /**
     * retrieveSubcategory - API endpoint that allows subcategories to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveSubcategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveSubcategory.Responses.$200>
    /**
     * updateSubcategory - API endpoint that allows subcategories to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateSubcategory.PathParameters> | null,
      data?: Paths.UpdateSubcategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSubcategory.Responses.$200>
    /**
     * partialUpdateSubcategory - API endpoint that allows subcategories to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateSubcategory.PathParameters> | null,
      data?: Paths.PartialUpdateSubcategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateSubcategory.Responses.$200>
    /**
     * destroySubcategory - API endpoint that allows subcategories to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroySubcategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroySubcategory.Responses.$204>
  }
  ['/categories/']: {
    /**
     * listCategorys - API endpoint that allows categories to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListCategorys.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCategorys.Responses.$200>
    /**
     * createCategory - API endpoint that allows categories to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCategory.Responses.$201>
  }
  ['/categories/{id}/']: {
    /**
     * retrieveCategory - API endpoint that allows categories to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveCategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveCategory.Responses.$200>
    /**
     * updateCategory - API endpoint that allows categories to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateCategory.PathParameters> | null,
      data?: Paths.UpdateCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateCategory.Responses.$200>
    /**
     * partialUpdateCategory - API endpoint that allows categories to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateCategory.PathParameters> | null,
      data?: Paths.PartialUpdateCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateCategory.Responses.$200>
    /**
     * destroyCategory - API endpoint that allows categories to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyCategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyCategory.Responses.$204>
  }
  ['/assessment-types/']: {
    /**
     * listAssessmentTypes - API endpoint that allows assessment types to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListAssessmentTypes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAssessmentTypes.Responses.$200>
    /**
     * createAssessmentType - API endpoint that allows assessment types to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAssessmentType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAssessmentType.Responses.$201>
  }
  ['/assessment-types/{id}/']: {
    /**
     * retrieveAssessmentType - API endpoint that allows assessment types to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveAssessmentType.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveAssessmentType.Responses.$200>
    /**
     * updateAssessmentType - API endpoint that allows assessment types to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateAssessmentType.PathParameters> | null,
      data?: Paths.UpdateAssessmentType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAssessmentType.Responses.$200>
    /**
     * partialUpdateAssessmentType - API endpoint that allows assessment types to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateAssessmentType.PathParameters> | null,
      data?: Paths.PartialUpdateAssessmentType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateAssessmentType.Responses.$200>
    /**
     * destroyAssessmentType - API endpoint that allows assessment types to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyAssessmentType.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyAssessmentType.Responses.$204>
  }
  ['/assessments/']: {
    /**
     * listAssessments - API endpoint that allows assessments to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListAssessments.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAssessments.Responses.$200>
    /**
     * createAssessment - API endpoint that allows assessments to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAssessment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAssessment.Responses.$201>
  }
  ['/assessments/{id}/']: {
    /**
     * retrieveAssessment - API endpoint that allows assessments to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveAssessment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveAssessment.Responses.$200>
    /**
     * updateAssessment - API endpoint that allows assessments to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateAssessment.PathParameters> | null,
      data?: Paths.UpdateAssessment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAssessment.Responses.$200>
    /**
     * partialUpdateAssessment - API endpoint that allows assessments to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateAssessment.PathParameters> | null,
      data?: Paths.PartialUpdateAssessment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateAssessment.Responses.$200>
    /**
     * destroyAssessment - API endpoint that allows assessments to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyAssessment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyAssessment.Responses.$204>
  }
  ['/child-notes/']: {
    /**
     * listChildNotes - API endpoint that allows children notes to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListChildNotes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListChildNotes.Responses.$200>
    /**
     * createChildNote - API endpoint that allows children notes to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateChildNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateChildNote.Responses.$201>
  }
  ['/child-notes/{id}/']: {
    /**
     * retrieveChildNote - API endpoint that allows children notes to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveChildNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveChildNote.Responses.$200>
    /**
     * updateChildNote - API endpoint that allows children notes to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateChildNote.PathParameters> | null,
      data?: Paths.UpdateChildNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateChildNote.Responses.$200>
    /**
     * partialUpdateChildNote - API endpoint that allows children notes to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateChildNote.PathParameters> | null,
      data?: Paths.PartialUpdateChildNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateChildNote.Responses.$200>
    /**
     * destroyChildNote - API endpoint that allows children notes to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyChildNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyChildNote.Responses.$204>
  }
  ['/class-notes/']: {
    /**
     * listClassroomNotes - API endpoint that allows classroom notes to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListClassroomNotes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListClassroomNotes.Responses.$200>
    /**
     * createClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateClassroomNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateClassroomNote.Responses.$201>
  }
  ['/class-notes/{id}/']: {
    /**
     * retrieveClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveClassroomNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveClassroomNote.Responses.$200>
    /**
     * updateClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateClassroomNote.PathParameters> | null,
      data?: Paths.UpdateClassroomNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClassroomNote.Responses.$200>
    /**
     * partialUpdateClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateClassroomNote.PathParameters> | null,
      data?: Paths.PartialUpdateClassroomNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateClassroomNote.Responses.$200>
    /**
     * destroyClassroomNote - API endpoint that allows classroom notes to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyClassroomNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyClassroomNote.Responses.$204>
  }
  ['/classes/']: {
    /**
     * listClassrooms - API endpoint that allows classrooms to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListClassrooms.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListClassrooms.Responses.$200>
    /**
     * createClassroom - API endpoint that allows classrooms to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateClassroom.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateClassroom.Responses.$201>
  }
  ['/classes/{id}/']: {
    /**
     * retrieveClassroom - API endpoint that allows classrooms to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveClassroom.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveClassroom.Responses.$200>
    /**
     * updateClassroom - API endpoint that allows classrooms to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateClassroom.PathParameters> | null,
      data?: Paths.UpdateClassroom.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClassroom.Responses.$200>
    /**
     * partialUpdateClassroom - API endpoint that allows classrooms to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateClassroom.PathParameters> | null,
      data?: Paths.PartialUpdateClassroom.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateClassroom.Responses.$200>
    /**
     * destroyClassroom - API endpoint that allows classrooms to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyClassroom.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyClassroom.Responses.$204>
  }
  ['/children/']: {
    /**
     * listChilds - API endpoint that allows children to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListChilds.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListChilds.Responses.$200>
    /**
     * createChild - API endpoint that allows children to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateChild.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateChild.Responses.$201>
  }
  ['/children/{id}/']: {
    /**
     * retrieveChild - API endpoint that allows children to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveChild.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveChild.Responses.$200>
    /**
     * updateChild - API endpoint that allows children to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateChild.PathParameters> | null,
      data?: Paths.UpdateChild.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateChild.Responses.$200>
    /**
     * partialUpdateChild - API endpoint that allows children to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateChild.PathParameters> | null,
      data?: Paths.PartialUpdateChild.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateChild.Responses.$200>
    /**
     * destroyChild - API endpoint that allows children to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyChild.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyChild.Responses.$204>
  }
  ['/user/']: {
    /**
     * listUsers - API endpoint that allows users to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUsers.Responses.$200>
    /**
     * createUser - API endpoint that allows users to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUser.Responses.$201>
  }
  ['/user/{id}/']: {
    /**
     * retrieveUser - API endpoint that allows users to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveUser.Responses.$200>
    /**
     * updateUser - API endpoint that allows users to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
      data?: Paths.UpdateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUser.Responses.$200>
    /**
     * partialUpdateUser - API endpoint that allows users to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateUser.PathParameters> | null,
      data?: Paths.PartialUpdateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateUser.Responses.$200>
    /**
     * destroyUser - API endpoint that allows users to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroyUser.Responses.$204>
  }
  ['/school/']: {
    /**
     * listSchools - API endpoint that allows schools to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.ListSchools.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSchools.Responses.$200>
    /**
     * createSchool - API endpoint that allows schools to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSchool.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSchool.Responses.$201>
  }
  ['/school/{id}/']: {
    /**
     * retrieveSchool - API endpoint that allows schools to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveSchool.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveSchool.Responses.$200>
    /**
     * updateSchool - API endpoint that allows schools to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateSchool.PathParameters> | null,
      data?: Paths.UpdateSchool.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSchool.Responses.$200>
    /**
     * partialUpdateSchool - API endpoint that allows schools to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateSchool.PathParameters> | null,
      data?: Paths.PartialUpdateSchool.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateSchool.Responses.$200>
    /**
     * destroySchool - API endpoint that allows schools to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroySchool.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DestroySchool.Responses.$204>
  }
  ['/api/token/']: {
    /**
     * createTokenObtainPair - Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTokenObtainPair.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTokenObtainPair.Responses.$201>
  }
  ['/api/token/refresh/']: {
    /**
     * createTokenRefresh - Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTokenRefresh.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTokenRefresh.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
