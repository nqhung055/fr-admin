/* async changeSelectedDevice() {
    const usersResponse = await this.$axios.get(
        `/get/user/list/of/${this.selectedDevice}`
    )
    if (usersResponse.status === 200) {
        this.users = usersResponse.data
    } else {
        Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Can not get User list. Please try again later!",
        })
    }
} */
import Vue from "vue";

export const detectionLogsFromAPI = new Vue({
    data: {
        results: [],
        // dlRows:[],
    },
    async mounted() {
        await this.$axios
            .get(`/logs?pageIndex=0&pageSize=1000000`)
            .then((response) => { 
                this.results = response.data;
                console.log('results: ' + this.results.rows.length);
            })
            .catch(error => console.log(error));
        // this.dlFromAPI();
    },
    methods: {
        /* async dlFromAPI() {
            const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`)
            if (dlResponse.status === 200) {
                this.results = dlResponse.data
            } else {
                Vue.notify({
                    group: "loggedIn",
                    type: "error",
                    text: "Can not get data list. Please try again later!",
                })
            }
        } */
    }
});

export const fDetectionLogs = {
    'count': 100,
    'rows': [
        
    ]
};
/* export const detectionlogs = [
    {
        id: 6,
        userId: "F1000001",
        detectionTime: "2020-07-29 17:32:39",
        bodyTemperature: 36.4,
        roomTemperature: 25.17,
        confidence: 0,
        fromDevice: "RLK-0061345",
        type: "STRANGER",
        photo: "/static/avatars/user-6.jpg",
        detectionUUID: "77cd0431-4812-4f7b-8edf-3a5d3df19803",
        createdAt: "2020-07-29T09:32:37.000Z",
        updatedAt: "2020-07-29T09:32:37.000Z",
    },
    {
        id: 5,
        userId: "F1000001",
        detectionTime: "2020-07-29 17:32:34",
        bodyTemperature: 36.3,
        roomTemperature: 25.22,
        confidence: 0,
        fromDevice: "RLK-0061345",
        type: "STRANGER",
        photo: "/static/avatars/user-5.jpg",
        detectionUUID: "45af6711-b4e9-40c7-bb37-35fbce331ff4",
        createdAt: "2020-07-29T09:32:32.000Z",
        updatedAt: "2020-07-29T09:32:32.000Z",
    },
    {
        id: 4,
        userId: "F1000001",
        detectionTime: "2020-07-29 17:31:34",
        bodyTemperature: 36.6,
        roomTemperature: 25.1,
        confidence: 92.2193,
        fromDevice: "RLK-0061345",
        type: "STRANGER",
        photo: "/static/avatars/user-4.jpg",
        detectionUUID: "56801e6a-5f4f-45e5-9eaa-1971d4f6c317",
        createdAt: "2020-07-29T09:31:32.000Z",
        updatedAt: "2020-07-29T09:31:32.000Z",
    },
    {
        id: 3,
        userId: "F1000001",
        detectionTime: "2020-07-29 17:31:29",
        bodyTemperature: 36.3,
        roomTemperature: 25.14,
        confidence: 95.0782,
        fromDevice: "RLK-0061345",
        type: "STRANGER",
        photo: "/static/avatars/user-3.jpg",
        detectionUUID: "c2cfe89c-7131-49a4-b2cc-3aa10241b316",
        createdAt: "2020-07-29T09:31:27.000Z",
        updatedAt: "2020-07-29T09:31:27.000Z",
    },
    {
        id: 2,
        userId: "F1000001",
        detectionTime: "2020-07-29 17:31:02",
        bodyTemperature: 36.4,
        roomTemperature: 25.11,
        confidence: 92.8905,
        fromDevice: "RLK-0061345",
        type: "STRANGER",
        photo: "/static/avatars/user-2.jpg",
        detectionUUID: "fc2f94db-1976-49cc-909e-ae8e4ca40c85",
        createdAt: "2020-07-29T09:31:00.000Z",
        updatedAt: "2020-07-29T09:31:00.000Z",
    },
    {
        id: 1,
        userId: "F1000001",
        detectionTime: "2020-07-29 17:30:34",
        bodyTemperature: 36.4,
        roomTemperature: 25.06,
        confidence: 92.5301,
        fromDevice: "RLK-0061345",
        type: "STRANGER",
        photo: "/static/avatars/user-1.jpg",
        detectionUUID: "202bc506-e95e-4ad9-b6b3-7583427e3a1f",
        createdAt: "2020-07-29T09:30:33.000Z",
        updatedAt: "2020-07-29T09:30:33.000Z",
    },
]; */
