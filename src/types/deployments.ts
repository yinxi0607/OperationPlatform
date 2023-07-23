export interface DeploymentsDetailProps {
    image : string
    running_time : string
    status: string
    name: string
}

export interface DeploymentsAllProps {
    image : string
    creation_timestamp : string
    ready: string
    name: string
    namespace: string
}