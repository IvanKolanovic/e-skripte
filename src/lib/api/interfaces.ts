export interface UserProfile {
	id: string;
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	picture: string;
}

export interface ChangePasswordRequest {
	userId: string;
	password: string;
}

export interface Subject {
	id: string;
	schoolId: string;
	name: string;
	description: string;
	postNum: number;
}

export interface School {
	id: string;
	name: string;
	subjects: SubjectWithSchool[]
}

export interface SubjectWithSchool {
	id: string;
	schoolId: string;
	name: string;
	description: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
	author: UserProfile;
    materials: PostMaterial[];
}

export interface PostMaterial {
    id: string;
    material: string;
}

export interface SubjectComplete {
    id: string;
    schoolId: string;
    school: {
        id: string;
        name: string;
    };
    name: string;
    description: string;
    posts: Post[];
}
