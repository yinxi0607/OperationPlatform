export interface DeploymentsPodsProps {
    image : string
    running_time : string
    status: string
    name: string
}

export interface DeploymentDetailProps {
    "name": string,
    "image": string,
    "replicas": number,
    "port": number,
    "limit_resource_memory": string
    "limit_resource_cpu": string,
    "requests_resource_memory": string,
    "requests_resource_cpu": string
}

export interface DeploymentsAllProps {
    image : string
    creation_timestamp : string
    ready: string
    name: string
    namespace: string
}