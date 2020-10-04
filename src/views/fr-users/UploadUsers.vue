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
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    :label="$t('message.upload')"
                    :rules="uploadRules"
                    filled
                    v-model="excelFile"
                    prepend-icon="mdi-camera"
                    @change="uploadExcelFile"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" align="center">
                  <v-file-input
                    :label="$t('message.upload')"
                    :rules="uploadImageRules"
                    filled
                    v-model="uploadImages"
                    prepend-icon="mdi-camera"
                    @change="uploadImage"
                    multiple
                  ></v-file-input>
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
              <v-row>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="createUsers()">
                  Create Users
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
// import { sheet_to_json } from 'xlsx';

export default {
  props: ["isShowPopup"],
  data() {
    return {
      uploadImageRules: [
        (file) =>
          !file.name ||
          file.name.includes(".png") ||
          file.name.includes(".jpg") ||
          file.name.includes(".jpeg") ||
          "Should be a Png or Jpeg File!",
      ],
      uploadRules: [
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
      excelFile: {},
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
    };
  },
  mounted() {},
  computed: {},
  methods: {
    uploadExcelFile() {
      if (!this.excelFile) return;
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.addEventListener(
        "load",
        () => {
          let data = reader.result;
          if (!rABS) data = new Uint8Array(data);
          const workbook = XLSX.read(data, { type: rABS ? "binary" : "array" });
          const rawUploadUsers = workbook.SheetNames.reduce(
            (uploadUsers, sheetName) => {
              const sheetUsers = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName]
              );
              
              const sheetUsersWithDevice = sheetUsers.map((user) => {
                return {
                  ...user,
                  devices: [sheetName],
                };
              });            
              return uploadUsers = [...uploadUsers, ...sheetUsersWithDevice];
            },
            []
          );
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
        reader.readAsBinaryString(this.excelFile);
      } else reader.readAsArrayBuffer(this.excelFile);
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
      this.$emit("closePopup", true);
    },
    createUsers() {
      this.uploadUsers.map((user) => {
        this.$axios.post("/upload/user", user);
      });
    },
  },
};
</script>

<style>
</style>
