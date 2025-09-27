export class CreateBugDto {
    readonly title: string;
    readonly description?: string;
    readonly severity?: string;
    readonly affectedVersion?: string;
    readonly reportedBy: string;
}