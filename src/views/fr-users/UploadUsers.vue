<template>
  <div>
    <v-dialog
      :value="isShowPopup"
      max-width="1000px"
      max-height="1000px"
      @click:outside="closePopup"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t("message.uploadExcelFile") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="grid-list-md pa-0">
            <v-form ref="uploadData" v-model="isUploadDataValid">
              <v-row>
                <v-col cols="6">
                  <v-file-input
                    :label="$t('message.uploadExcelFile')"
                    :rules="uploadRules"
                    filled
                    v-model="uploadExcelFile"
                    prepend-icon="mdi-camera"
                    @change="uploadExcelFiles"
                  ></v-file-input>
                </v-col>
                <v-col cols="6" align="center">
                  <v-file-input
                    :label="$t('message.uploadImages')"
                    :rules="uploadImageRules"
                    filled
                    v-model="uploadImages"
                    prepend-icon="mdi-camera"
                    @change="uploadImage"
                    multiple
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedDevices"
                    :items="connectedDevices"
                    label="Upload To Devices"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
              <v-data-table :headers="tableHeaders" :items="uploadUsers">
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">{{ props.header.text }}</span>
                    <span>{{ props.header.text }}</span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                </template>
                <template v-slot:item.image="{ item }">
                  <div class="p-2">
                    <v-img :src="item.facePhoto" height="50" width="50"></v-img>
                  </div>
                </template>
              </v-data-table>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn class="px-4" color="success" @click="createUsers()">
                  Create Users
                </v-btn>
                <v-btn class="px-4" color="error" @click="clearUploadedData()">
                  Clear Uploaded Data
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import XLSX from "xlsx";

export default {
  props: ["isShowPopup", "connectedDevices"],
  data() {
    return {
      uploadImageRules: [
        (files) => !!files.length || "Images file should not be empty",
        (files) =>
          !files.name ||
          files.name.includes(".png") ||
          files.name.includes(".jpg") ||
          files.name.includes(".jpeg") ||
          "Images should be a Png or Jpeg file!",
      ],
      uploadRules: [
        (files) => !!files.size || "Excel file should not be empty",
        (file) =>
          !file ||
          file.size < 1000000 ||
          "File Excel size should be less than 1 MB!",
        (file) =>
          !file ||
          !file.name ||
          file.name.includes(".xls") ||
          file.name.includes(".xlsx") ||
          "Should be a Excel File!",
      ],
      uploadExcelFile: {},
      tableHeaders: [
        {
          text: "ID",
          align: "left",
          value: "userId",
          width: "2%",
        },
        {
          text: "Username",
          align: "left",
          value: "name",
          width: "10%",
        },
        {
          text: "Personal confidence",
          align: "center",
          value: "confidenceLevel",
          width: "10%",
        },
        {
          text: "FacePhoto",
          align: "center",
          value: "image",
          width: "10%",
        },
      ],
      uploadUsers: [],
      uploadImages: [],
      isUploadDataValid: true,
      selectedDevices: [],
    };
  },
  mounted() {},
  computed: {},
  methods: {
    uploadExcelFiles() {
      if (!this.uploadExcelFile) return;
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.addEventListener(
        "load",
        () => {
          let data = reader.result;
          if (!rABS) data = new Uint8Array(data);
          const workbook = XLSX.read(data, { type: rABS ? "binary" : "array" });
          const rawUploadUsers = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          );
          this.selectedDevices = [workbook.SheetNames[0]];

          this.uploadUsers = rawUploadUsers.map((rawUser) => {
            return {
              devices: rawUser["devices"],
              confidenceLevel: rawUser["Personal confidence"],
              userType: rawUser["User type"],
              name: rawUser["Name"],
              userId: parseInt(rawUser["Number"]),
              facePhoto: "",
              phone: rawUser["Cellphone number"],
              effectFrom: rawUser["Validity period"],
            };
          });
        },
        false
      );

      if (rABS) {
        reader.readAsBinaryString(this.uploadExcelFile);
      } else reader.readAsArrayBuffer(this.uploadExcelFile);
    },
    async uploadImage() {
      this.uploadImages.map((image) => {
        const userId = image.name.split(".")[0];
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const users = this.uploadUsers.filter(
              (user) => user.userId === parseInt(userId)
            );
            users.forEach((user) => {
              user.facePhoto = reader.result;
            });
          },
          false
        );
        reader.readAsDataURL(image);
      });
    },
    closePopup() {
      this.clearUploadedData();
      this.$emit("closePopup", true);
    },
    async createUsers() {
      if (!this.$refs.uploadData.validate()) return;
      try {
        await this.deleteUserFromDevice();

        await Promise.all(
          this.uploadUsers.map((user) => {
            const userWithDevies = { ...user, devices: this.selectedDevices };
            return this.$axios.post("/upload/user", userWithDevies);
          })
        );

        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Create users success!",
        });
      } catch (error) {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Error when creates users!",
        });
      }
    },
    clearUploadedData() {
      this.uploadUsers = [];
      this.uploadExcelFile = {};
      this.uploadImages = [];
    },
    async deleteUserFromDevice() {
      console.log(236, this.uploadUsers);
      try {
        return Promise.all(
          this.selectedDevices.map((device) => {
            return this.$axios.delete(`batch/delete/users`, {
              data: {
                deviceId: device,
                userIds: this.uploadUsers.map((user) => user.userId),
              },
            });
          })
        );
      } catch (error) {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Error when delete users from devices!",
        });
      }
    },
  },
};
</script>

<style></style>
