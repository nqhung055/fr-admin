<template>
  <div></div>
</template>

<script>
import AppConfig from "../../constants/AppConfig";

export default {
    async created() {
        let ws = new WebSocket(`${AppConfig.ws}${AppConfig.ws_port}`);
        this.$data.dom = []; this.objDetection = null;
        ws.onopen = () => {
            // console.log('WS state: ' + ws.readyState);
            // console.log('Event: ' + e.srcElement);
            ws.send(JSON.stringify({ cmd: "user_client" }));

            ws.onmessage = async (msg) => {
                let data = JSON.parse(msg.data);
                let strObjInsert = {}; let userid = ""; let time = ""; let bodyTemp = ""; let confidence = ""; let roomTemp = "";
                Object.entries(data["data"]).forEach(dt => {
                    // console.log('dt: ' + JSON.stringify(dt[1]));
                    Object.keys(JSON.parse(JSON.stringify(dt[1]))).forEach((key) => {
                        // console.log('key: ' + key + ' - val: ' + dt[1][key]);
                        if(key === "userId") userid = dt[1][key];
                        else if(key === "time") time = dt[1][key];
                        else if(key === "bodyTemperature") bodyTemp = dt[1][key];
                        else if(key === "confidence") confidence = dt[1][key];
                        else if(key === "roomTemperature") roomTemp = dt[1][key];
                    });
                });
                strObjInsert = { type: data['type'], userId: userid, time: time, bodyTemp: bodyTemp, confidence: confidence, roomTemp: roomTemp };
                await this.createWSData(this.urlWSDateCreate, strObjInsert);
                this.$emit('onmessage', strObjInsert)
            };
        };
    },
    data() {
        return {
            loading: true,
            errorred: false,
            dom: [],
            objDetection: null,
            urlWSDateCreate: `${AppConfig.ip}${AppConfig.api_port}/ws/`,
        };
    },
    methods: {
        async createWSData(api, obj) {
            const create = await this.$axios.patch(api, obj);
              try {
                if (create.status === 200) {
                  this.errorred = false;
                  return
                }
              } catch (error) {
                this.errorred = true;
                  console.log(error);
                  return
              }
              finally {() => {this.loading = false; return}}
        }
    },
};
</script>
