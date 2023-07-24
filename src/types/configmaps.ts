export interface ConfigmapsAllProps {
    creation_timestamp? : string;
    data: {
        [key: string]: string;
    };
    name: string;
    namespace: string;
}


