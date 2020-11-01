<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-row>
            <v-col cols="12" sm="3" md="2" lg="2" xl="1">
              <v-btn color="success" @click="showNewUserDialogMethod()">
                Create User
              </v-btn>
            </v-col>
            <v-col cols="12" sm="3" md="2" lg="2" xl="1">
              <v-btn color="success" @click="isShowPopupSyncUsers = true">
                Sync User From A Device
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3" md="2" lg="2" xl="1">
              <v-btn color="success" @click="isShowPopupUploadUsers = true">
                Upload Users
              </v-btn>
            </v-col>
          </v-row>
          <v-card>
            <div v-if="errored">
              <p>{{ $t("message.getLogsError") }}</p>
            </div>
            <div v-else>
              <div v-if="loading" class="pr-4">
                {{ $t("message.loading") }}
              </div>
              <div v-else>
                <v-card-text>
                  <v-row>
                    <v-col cols="6" class="header-table-select-devices">
                      <v-select
                        v-model="selectedDevice"
                        :items="devices"
                        item-text="displayName"
                        item-value="name"
                        label="Select Device"
                        @change="
                          getListUsers();
                          siteId = '-- Please select site --';
                          blockId = '-- Please select block --';
                          floorId = '-- Please select floor --';
                          compId = '-- Please select company --';
                        "
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6" class="header-table-search">
                      <v-text-field
                        v-model="searchUserKey"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="siteId"
                        :items="userSites"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Site"
                        :disabled="!selectedDevice"
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="blockId"
                        :items="userBlocks"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Block"
                        :disabled="!selectedDevice"
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="floorId"
                        :items="userFloors"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Floor"
                        :disabled="!selectedDevice"
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="compId"
                        :items="userCompanies"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Company"
                        :disabled="!selectedDevice"
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn color="error" @click="showDeleteUsersDialog()">
                        Delete Users
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="users"
                  show-select
                  v-model="selectedUsersToDelete"
                  :search="searchUserKey"
                  item-key="userId"
                  @dblclick:row="(e, { item }) => editUser(item)"
                >
                  <template slot="headerCell" slot-scope="props">
                    <v-tooltip bottom>
                      <span slot="activator">{{ props.header.text }}</span>
                      <span>{{ props.header.text }}</span>
                    </v-tooltip>
                  </template>
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <!---->
                    <v-btn color="success" @click="editUser(item)">
                      <v-icon>ti-pencil</v-icon>
                    </v-btn>
                    <v-btn color="error" @click="removeUser(item)">
                      <v-icon>ti-trash</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </div>
            </div>
          </v-card>
        </app-card>
      </v-row>
    </v-container>
    <v-dialog
      v-model="showNewUserDialog"
      max-width="1000px"
      max-height="1000px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t("message.addNewUser") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="grid-list-md pa-0">
            <v-form ref="newUser" v-model="isNewUserValid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="6"
                      class="container-user-photo"
                      order-md="last"
                    >
                      <v-row>
                        <v-col cols="12" align="center">
                          <v-img
                            :src="srcFacePhoto"
                            width="100"
                            height="96"
                          ></v-img>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input
                            :label="$t('message.facePhotoLabel')"
                            filled
                            v-model="facePhoto"
                            prepend-icon="mdi-camera"
                            @change="uploadFile()"
                          ></v-file-input>
                          <!-- :rules="uploadRules" -->
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6" class="container-user-info">
                      <v-row>
                        <v-col cols="12" class="user-devices">
                          <v-select
                            v-model="newUser.devices"
                            :items="devices"
                            :rules="newUserRules.devices"
                            label="Add to Devices"
                            multiple
                          >
                            <template v-slot:prepend-item>
                              <v-list-item ripple @click="selectAllDevices">
                                <v-list-item-action>
                                  <v-icon
                                    :color="
                                      newUser.devices.length > 0
                                        ? 'indigo darken-4'
                                        : ''
                                    "
                                    >{{ icon }}</v-icon
                                  >
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title
                                    >Select All</v-list-item-title
                                  >
                                </v-list-item-content>
                              </v-list-item>
                              <v-divider class="mt-2"></v-divider>
                            </template>
                          </v-select>
                        </v-col>
                        <v-col cols="12" class="user-id">
                          <v-row>
                            <!-- <v-col>
                              <v-text-field
                                :label="$t('message.userId')"
                                v-model="newUser.userId"
                                :rules="newUserRules.id"
                                required
                              ></v-text-field>
                            </v-col> -->
                            <v-col>
                              <v-text-field
                                :label="'Card ID'"
                                v-model="newUser.cardId"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="user-name">
                          <div>
                            <v-text-field
                              :label="$t('message.name')"
                              v-model="newUser.name"
                              :rules="newUserRules.name"
                              required
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6" class="continer-user-left">
                      <v-row>
                        <v-col cols="12" class="user-phone">
                          <v-text-field
                            :label="$t('message.phone')"
                            v-model="newUser.phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="user-type">
                          <div>
                            <v-select
                              v-model="newUser.userType"
                              :items="userTypes"
                              item-text="text"
                              item-value="value"
                              :label="$t('message.userType')"
                            ></v-select>
                          </div>
                        </v-col>
                        <v-col cols="12" class="user-confidence">
                          <v-text-field
                            type="number"
                            :label="$t('message.confidenceLevel')"
                            v-model="newUser.confidenceLevel"
                            :rules="newUserRules.confidenceLevel"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="user-ic">
                          <v-row>
                           <v-col>
                            <v-text-field
                              :label="$t('message.ic')"
                              v-model="newUser.ic"
                              :rules="newUserRules.ic"
                              required
                            ></v-text-field>
                            </v-col>
                            <v-col>
                            <v-menu
                             v-model="isShowIcCardExpiryPanel"
                             :close-on-content-click="false"
                             :nudge-right="40"
                             transition="scale-transition"
                             offset-y
                             min-width="290px"
                            >
							<template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="newUser.ic_exp"
                                :label="$t('message.icCardExpiry')"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="newUser.ic_exp"
                               @input="isShowIcCardExpiryPanel=false"
                            ></v-date-picker>
                           </v-menu>
                           </v-col>
                         </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="newUser.siteId"
                            :items="userSites"
                            item-text="name"
                            item-value="shortName"
                            single-line
                            label="Select Site"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="newUser.floorId"
                            :items="userFloors"
                            item-text="name"
                            item-value="shortName"
                            single-line
                            label="Select Floor"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6" class="continer-user-right">
                      <v-row>
                        <v-col cols="6" class="user-ef-h">
                          <v-menu
                            v-model="isShowEffectFromPanel"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="newUser.effectFrom"
                                :label="$t('message.effectFrom')"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="newUser.effectFrom"
                              @input="isShowEffectFromPanel = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="6" class="user-ef-m">
                          <v-menu
                            ref="effectFromMenu"
                            v-model="isShowEffectFromMinutePanel"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="effectFromStringMinute"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="effectFromStringMinute"
                                label="Time"
                                prepend-icon="access_time"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="isShowEffectFromMinutePanel"
                              v-model="effectFromStringMinute"
                              full-width
                              @click:minute="
                                $refs.effectFromMenu.save(
                                  effectFromStringMinute
                                )
                              "
                            >
                            </v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="6" class="user-ea-h">
                          <v-menu
                            v-model="isShowExpiredAtPanel"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="newUser.expiredAt"
                                :label="$t('message.expiredAt')"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="newUser.expiredAt"
                              @input="isShowExpiredAtPanel = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="6" class="user-ea-m">
                          <v-menu
                            ref="expiredAtMenu"
                            v-model="isShowExpiredAtMinutePanel"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="expiredAtStringMinute"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="expiredAtStringMinute"
                                label="Time"
                                prepend-icon="access_time"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="isShowExpiredAtMinutePanel"
                              v-model="expiredAtStringMinute"
                              full-width
                              @click:minute="
                                $refs.expiredAtMenu.save(expiredAtStringMinute)
                              "
                            >
                            </v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="5" class="user-al-s">
                          <v-menu
                            ref="startTime"
                            v-model="isShowStartTime"
                            :close-on-content-click="false"
                            :return-value.sync="startTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="startTime"
                                label="Start"
                                prepend-icon="access_time"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="isShowStartTime"
                              v-model="startTime"
                              full-width
                              @click:minute="$refs.startTime.save(startTime)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="5" class="user-al-e">
                          <v-menu
                            ref="endTime"
                            v-model="isShowEndTime"
                            :close-on-content-click="false"
                            :return-value.sync="endTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="endTime"
                                label="End"
                                prepend-icon="access_time"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="isShowEndTime"
                              v-model="endTime"
                              full-width
                              @click:minute="$refs.endTime.save(endTime)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <!--<v-col cols="2" class="user-al-a">
                          <v-icon
                            size="25"
                            style="color: green; cursor: pointer"
                            @click="addPeriod()"
                            >ti-plus</v-icon
                          >
                        </v-col>-->
                        <v-col cols="12" class="user-company">
                          <v-select
                            v-model="newUser.companyId"
                            :items="userCompanies"
                            item-text="name"
                            item-value="shortName"
                            single-line
                            label="Select Company"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" class="user-block">
                          <v-select
                            v-if="userBlocks"
                            v-model="newUser.blockId"
                            :items="userBlocks"
                            label="Select Block"
                            item-text="name"
                            item-value="shortName"
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" class="user-periods">
                          <v-select
                            v-model="newUser.allowPeriods"
                            :items="newUser.allowPeriods"
                            :label="$t('message.allowPeriods')"
                            :item-text="
                              (period) =>
                                period.startTime + '-' + period.endTime
                            "
                            attach
                            chips
                            multiple
                            :cache-items="true"
                          >
                            <template slot="item" slot-scope="props">
                              {{
                                props.item.startTime +
                                " - " +
                                props.item.endTime
                              }}
                            </template>
                            <template slot="prepend" slot-scope="props">
                              {{
                                props.item.startTime +
                                " - " +
                                props.item.endTime
                              }}
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn class="px-4" color="success" v-on:click="addNewUser">
            {{ $t("message.add") }}
          </v-btn>
          <v-btn
            class="px-4"
            color="error"
            @click.native="showNewUserDialog = false"
          >
            {{ $t("message.close") }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <edit-user
      :isShowPopup="showEditUserDialog"
      :device="devices"
      :blocks="userBlocks"
      :companies="userCompanies"
      :floors="userFloors"
      :sites="userSites"
      :icMasked="editedUser.icCardMasked"
      :editUser="editedUser"
      :userTypes="userTypes"
      :effectFromStringMinute="editUserEffectFromStringMinute"
      :expiredAtStringMinute="editUserExpiredAtStringMinute"
      @updateSuccess="getListUsers()"
      @closePopup="closePopupEditUser()"
    ></edit-user>
    <upload-users
      :connectedDevices="devices"
      :isShowPopup="isShowPopupUploadUsers"
      @closePopup="closePopupUploadExcel()"
      @uploadSuccess="uploadUsersSuccess()"
    ></upload-users>
    <sync-users
      :connectedDevices="devices"
      :isShowPopup="isShowPopupSyncUsers"
      @closePopup="closePopupSyncUsers()"
    ></sync-users>
    <v-dialog
      v-model="showConfirmDeleteUsersDialog"
      max-width="400"
      @click:outside="showConfirmDeleteUsersDialog = false"
    >
      <v-card>
        <v-card-title> Delete Users? </v-card-title>
        <v-card-text> Do you want to delete all selected users? </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn class="px-4" color="success" @click="deleteUsers()">
            Yes
          </v-btn>
          <v-btn
            class="px-4"
            color="error"
            @click="showConfirmDeleteUsersDialog = false"
          >
            No
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import editUser from "./Edit";
import uploadUsers from "./UploadUsers";
import syncUsers from "./SyncUsers";
import AppConfig from "../../constants/AppConfig";
import moment from 'moment';

export default {
  components: {
    editUser,
    uploadUsers,
    syncUsers,
  },
  data() {
    return {
      loader: true,
      loading: true,
      errored: false,
      searchUserKey: "",
      headers: [
        /*{
          text: "ID",
          align: "left",
          sortable: false,
          value: "userId",
          width: "10%",
        },*/
        {
          text: "Username",
          align: "left",
          sortable: false,
          value: "name",
        },
        {
          text: "NRIC/FIN",
          align: "left",
          sortable: false,
          value: "icCardMasked",
        },
        {
          text: "FIN Exp. Date",
          align: "left",
          sortable: false,
          value: "ic_exp",
        },
        {
          text: "Exp. Date",
          align: "left",
          sortable: false,
          value: "validUntil",
        },
        {
          text: "Card ID",
          align: "left",
          sortable: false,
          value: "cardId",
        },
        {
          text: "Site",
          align: "left",
          sortable: false,
          value: "siteName",
        },
        {
          text: "Floor",
          align: "left",
          sortable: false,
          value: "floorName",
        },
        {
          text: "Block",
          align: "left",
          sortable: false,
          value: "blockName",
        },
        {
          text: "Company",
          align: "left",
          sortable: false,
          value: "companyName",
        },
        {
          text: "Status",
          align: "left",
          sortable: false,
          value: "status",
        },
        { text: "Action", align: "center", value: "action", width: "10%" },
      ],
      userTypes: [
        {
          text: "Face only",
          value: 0,
        },
        {
          text: "Face and Card",
          value: 1,
        },
      ],
      devices: [],
      users: [],
      selectedUsersToDelete: [],
      selectedDevice: "",
      showNewUserDialog: false,
      showEditUserDialog: false,
      newUser: {
        devices: [],
        blockId: "",
        companyId: "",
        floorId: "",
        siteId: "",
        cardId: "",
        confidenceLevel: 65,
        userType: 0,
        allowPeriods: [],
      },
      isShowEffectFromPanel: false,
      isShowEffectFromMinutePanel: false,
      isShowExpiredAtPanel: false,
      isShowIcCardExpiryPanel: false,
      isShowExpiredAtMinutePanel: false,
      effectFromStringMinute: "",
      expiredAtStringMinute: "",

      isShowEndTime: false,
      isShowStartTime: false,
      endTime: "",
      startTime: "",

      facePhoto: {},
      srcFacePhoto: "",
      uploadRules: [
        (file) =>
          !file ||
          file.size < 1000000 ||
          "JPG file format (maximum 300Kb & recommended resolution 1280 x 720)",
        // "FacePhoto size should be less than 1 MB!",
      ],
      isNewUserValid: true,
      newUserRules: {
        devices: [(devices) => !!devices.length || "Devices should not empty"],
        name: [
          (name) => !!name || "Name is required",
          (name) =>
            (name && name.length <= 10) ||
            "Name must be less than 10 characters",
        ],
        id: [(id) => !!id || "ID is required"],
        ic: [(ic) => !!ic || "IC Card is required"],
		ic_exp: [(ic_exp) => !!ic_exp || "IC Card Expiry is required"],
        confidenceLevel: [
          (confidenceLevel) =>
            !isNaN(confidenceLevel) || "ConfidenceLevel must be a number",
          (confidenceLevel) =>
            (confidenceLevel > 0 && confidenceLevel < 100) ||
            "ConfidenceLevel must between 0 and 100",
        ],
      },
      editedUser: {},
      editUserEffectFromStringMinute: "",
      editUserExpiredAtStringMinute: "",
      exelFile: {},
      isShowPopupUploadUsers: false,
      isShowPopupSyncUsers: false,
      showConfirmDeleteUsersDialog: false,
      userBlocks: [],
      blockId: "-- Please select block --",
      userSites: [],
      siteId: "-- Please select site --",
      userFloors: [],
      floorId: "-- Please select floor --",
      userCompanies: [],
      compId: "-- Please select company --",
    };
  },
  mounted() {
    this.getDevices();
    this.getUserRelatedData();
  },
  computed: {
    cSelectAllDevices() {
      return this.newUser.devices.length === this.devices.length;
    },
    cSelectSomeDevices() {
      return this.newUser.devices.length > 0 && !this.cSelectAllDevices;
    },
    icon() {
      if (this.cSelectAllDevices) return "mdi-close-box";
      if (this.cSelectSomeDevices) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  methods: {
    async uploadFile() {
      if (this.facePhoto) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            this.srcFacePhoto = reader.result;
          },
          false
        );

        reader.readAsDataURL(this.facePhoto);
      } else {
        this.srcFacePhoto = "";
      }
    },
    async changeSelectedDevice() {
      const usersResponse = await this.$axios.get(
        `/get/user/list/of/${this.selectedDevice}`
      );
      if (usersResponse.status === 200) {
        this.users = usersResponse.data || [];
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Can not get User list. Please try again later!",
        });
      }
    },
    async getListUsers(sId = "", bId = "", fId = "", cId = "") {
      if (this.selectedDevice !== null || this.selectedDevice !== "") {
        let sDN = !Object.isFrozen(this.selectedDevice) ? this.selectedDevice["name"] : this.selectedDevice;
        let sSite = sId === "-- Please select site --" ? "" : sId;
        let sBlock = bId === "-- Please select block --" ? "" : bId;
        let sFloor = fId === "-- Please select floor --" ? "" : fId;
        let sComp = cId === "-- Please select company --" ? "" : cId;
        let sAPI = `${AppConfig.ip}${AppConfig.api_port}/users?device=${sDN}${!sSite ? "" : "&site=" + sSite}${!sBlock ? "" : "&block=" + sBlock}${!sFloor ? "" : "&floor=" + sFloor
        }${!sComp ? "" : "&comp=" + sComp}`;
        await this.$axios
          .get(sAPI)
          .then((response) => {
            this.users = response.data || [];
          })
          .catch((error) => {
            this.errored = true;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      }
    },
    renewUser() {
      this.newUser = {
        devices: [],
        blockId: "",
        companyId: "",
        floorId: "",
        siteId: "",
        cardId: "",
        confidenceLevel: 65,
        userType: -1,
        name: "",
        userId: "",
        expiredAt: "",
        effectFrom: "",
        facePhoto: "",
        allowPeriods: [],
      };
      this.effectFromStringMinute = "";
      this.expiredAtStringMinute = "";
      this.srcFacePhoto = "";
      this.facePhoto = {};
    },
    async addNewUser() {
      if (!this.$refs.newUser.validate()) return;
      this.newUser = {
        ...this.newUser,
        expiredAt: this.newUser.expiredAt
          ? this.newUser.expiredAt + " " + this.expiredAtStringMinute
          : undefined,
        effectFrom: this.newUser.effectFrom
          ? this.newUser.effectFrom + " " + this.effectFromStringMinute
          : undefined,
        facePhoto: this.srcFacePhoto,
      };

      const addResponse = await this.$axios.post("/upload/user", this.newUser);
      await this.$axios.patch(
        `${AppConfig.ip}${AppConfig.api_port}/users/${this.newUser.userId}?devices=${this.selectedDevice}`,
        {
          blockId: this.newUser.blockId,
          companyId: this.newUser.companyId,
          floorId: this.newUser.floorId,
          siteId: this.newUser.siteId,
          cardId: this.newUser.cardId,
          userId: this.newUser.userId,
          deviceIds: this.newUser.devices,
        }
      );
      if (addResponse.status === 200) {
        this.renewUser();
        this.showNewUserDialog = false;
        if (this.selectedDevice) {
          this.getListUsers();
        }
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Create User successful!",
        });
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Create user fail. Please try again later!",
        });
      }
    },
    async removeUser(user) {
      const deleteResponse = await this.$axios.delete(`/delete/user`, {
        params: { userId: user.userId, deviceId: this.selectedDevice },
      });
      if (deleteResponse.status === 200) {
        this.users = this.users.filter(
          (holdUser) => holdUser.userId !== user.userId
        );
        this.showNewUserDialog = false;
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Remove user successful!",
        });
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Remove user fail. Please try again later!",
        });
      }
    },
    async getDevices() {  
      let devices = [];
      await this.$axios
        .get("/registered/device/list")
        .then((gwRes) => {
          devices = gwRes.data;
        })
        .catch((error) => {
          this.errored = true;
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Can not get Devive list. Please reload page!",
          });
          console.log(error);
        })
        .finally(async () => {
          await this.$axios
            .get(
              `${AppConfig.ip}${AppConfig.api_port}/devices?deviceIds=` +
                devices.join(",")
            )
            .then((beRes) => {
              this.devices = beRes.data.map((device) => {
                return {
                  ...device,
                  displayName: device.displayName
                    ? device.displayName
                    : device.displayName
                    ? device.displayName
                    : `${device.siteId ? device.siteId + "-" : ""}${
                        device.blockId ? device.blockId + "-" : ""
                      }${device.floorId ? device.floorId + "-" : ""}${
                        device.customName ? device.customName : ""
                      }`,
                };
              });
              this.selectedDevice = this.devices[0];
              this.getListUsers();
            })
            .catch((error) => {
              this.errored = true;
              console.log(error);
            })
            .finally(() => {
              this.loading = false;
            });
        });
    },
    async getUserRelatedData() {
      const blocks = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/blocks`
      );
      const companies = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/companies`
      );
      const floors = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/floors`
      );
      const sites = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/sites`
      );
      let arrSites = [{ shortname: "", name: "-- Please select site --" }];
      let arrBlocks = [{ shortname: "", name: "-- Please select block --" }];
      let arrFloors = [{ shortname: "", name: "-- Please select floor --" }];
      let arrCompanies = [
        { shortname: "", name: "-- Please select company --" },
      ];
      try {
        if (
          blocks.status === 200 &&
          companies.status === 200 &&
          floors.status === 200 &&
          sites.status === 200
        ) {
          Object.values(sites.data).forEach((val) => {
            arrSites.push({ shortName: val["shortName"], name: val["name"] });
          });
          Object.values(blocks.data).forEach((val) => {
            arrBlocks.push({ shortName: val["shortName"], name: val["name"] });
          });
          Object.values(floors.data).forEach((val) => {
            arrFloors.push({ shortName: val["shortName"], name: val["name"] });
          });
          Object.values(companies.data).forEach((val) => {
            arrCompanies.push({
              shortName: val["shortName"],
              name: val["name"],
            });
          });
          this.userBlocks = arrBlocks;
          this.userCompanies = arrCompanies;
          this.userFloors = arrFloors;
          this.userSites = arrSites;
        }
      } catch (error) {
        this.errored = true;
        console.log(error);
      } finally {
        () => (this.loading = false);
      }
    },
    selectAllDevices() {
      this.$nextTick(() => {
        if (this.cSelectAllDevices) {
          this.newUser.devices = [];
        } else {
          this.newUser.devices = this.devices.slice();
        }
      });
    },
    showNewUserDialogMethod() {
      this.showNewUserDialog = true;
      if (this.$refs.newUser) {
        // When init ref this.$refs.newUser is undefined
        this.$refs.newUser.resetValidation();
      }
    },
    editUser(user) {
      this.showEditUserDialog = true;

      const editUser = {
        devices: [user.sn],
        block_id: user.blockId,
        company_id: user.companyId,
        floor_id: user.floorId,
        site_id: user.siteId,
        card_id: user.cardId,
        userId: user.userId,
        name: user.name,
        phone: user.phone,
        userType: parseInt(user.userType),
        confidenceLevel: user.confidenceLevel,
        ic: user.icCard,
        facePhoto: user.photo,
        allowPeriods: user.cycle ? JSON.parse(user.cycle) : undefined,
        expiredAt:
          user.validUntil && user.validUntil !== "forever"
            ? user.validUntil.substring(0, 10)
            : undefined,
         icCard_Expiry: 
            user.icCardExpiry !="" 
            ? moment(user.icCardExpiry).format('YYYY-MM-DD')
            : moment(date).format('YYYY-MM-DD'),
      };
      this.editUserExpiredAtStringMinute =
        user.validUntil && user.validUntil !== "forever"
          ? user.validUntil.substring(11, 5)
          : "";
      this.editedUser = editUser;
    },
    addPeriod() {
      this.newUser.allowPeriods = [
        ...this.newUser.allowPeriods,
        { startTime: this.startTime, endTime: this.endTime },
      ];
      this.startTime = "";
      this.endTime = "";
    },
    closePopupEditUser() {
      this.showEditUserDialog = false;
    },
    closePopupUploadExcel() {
      this.isShowPopupUploadUsers = false;
    },
    closePopupSyncUsers() {
      this.isShowPopupSyncUsers = false;
    },
    uploadUsersSuccess() {
      this.isShowPopupUploadUsers = false;
      this.getListUsers();
    },
    showDeleteUsersDialog() {
      if (!this.selectedUsersToDelete.length) {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "There is no users to delete!",
        });
        return;
      }
      this.showConfirmDeleteUsersDialog = true;
    },
    async deleteUsers() {
      const deleteUsersResponse = await this.$axios.delete(
        `batch/delete/users`,
        {
          data: {
            deviceId: this.selectedDevice,
            userIds: this.selectedUsersToDelete.map(({ userId }) => userId),
          },
        }
      );

      if (deleteUsersResponse.status === 200) {
        this.showConfirmDeleteUsersDialog = false;
        this.getListUsers();
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "User deleted!",
        });
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Delete User failed!",
        });
      }
    },
  },
};
</script>

<style>
.v-text-field {
  margin-top: 0 !important;
}
.v-text-field input {
  padding: 2px 0 2px;
}
.container {
  max-width: 100%;
}
.col {
  padding: 2px 10px !important;
}
.v-dialog {
  overflow-x: hidden;
}
@media screen and (max-width: 1024px) {
  .header-table-select-devices,
  .header-table-search {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media only screen and (max-width: 720px) {
  .continer-user-left,
  .continer-user-right,
  .container-user-info,
  .container-user-photo {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
