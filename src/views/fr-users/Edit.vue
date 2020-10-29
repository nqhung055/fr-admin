<template>
  <div>
    <v-dialog :value="isShowPopup" :persistent="true" max-width="1000px" max-height="1000px">
      <v-card>
				<v-card-title>
					<span class="headline">{{$t('message.editUser')}}</span>
				</v-card-title>
				<v-card-text>
					<v-container class="grid-list-md pa-0">
            <v-form
              ref="editUser"
              v-model="isEditUserValid"
              lazy-validation
            >
              <v-row>                
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6" class="container-user-photo"  order-md="last">
                      <v-row>
                        <v-col cols="12" align="center">
                          <v-img :src="editUser.facePhoto" width="100" height="96"></v-img>
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
                          <v-select :label="editUser.devices ? editUser.devices.toString() : ''" :disabled="true">
                          </v-select>
                        </v-col>
                        <v-col cols="12" class="user-id">
                          <v-row>
                            <v-col>
                              <v-text-field :label="$t('message.userId')" v-model="editUserModel.userId" :rules="editUserRules.id" required :disabled="true"></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                :label="'Card ID'"
                                v-model="editUserModel.card_id"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="user-name">
                          <div>
                            <v-text-field :label="$t('message.name')" v-model="editUserModel.name" :rules="editUserRules.name" required></v-text-field>
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
                          <v-text-field :label="$t('message.phone')" v-model="editUserModel.phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="user-type">
                          <div>
                            <v-select
                              v-model="editUserModel.userType"
                              :items="userTypes"
                              item-text="text"
                              item-value="value"
                              :label="$t('message.userType')"
                            ></v-select>
                          </div>
                        </v-col>
                        <v-col cols="12" class="user-confidence">
                          <v-text-field type="number" :label="$t('message.confidenceLevel')" v-model="editUserModel.confidenceLevel" :rules="editUserRules.confidenceLevel"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="user-ic">
                          <div>
                            <v-text-field :label="$t('message.ic')" v-model="editUserModel.ic" :rules="editUserRules.ic" required></v-text-field>
                          </div>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="editUserModel.site_id"
                            :items="sites"
                            item-text="name"
                            item-value="shortName"
                            single-line
                            label="Select Site"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="editUserModel.floor_id"
                            :items="floors"
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
                                v-model="editUserModel.effectFrom" 
                                :label="$t('message.effectFrom')" 
                                prepend-icon="event" 
                                readonly 
                                v-bind="attrs" 
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editUserModel.effectFrom"
                              @input="isShowEffectFromPanel=false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="6" class="user-ef-m">
                          <v-menu ref="effectFromMenu"
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
                              >
                              </v-text-field>
                            </template>
                            <v-time-picker
                              v-if="isShowEffectFromMinutePanel"
                              v-model="effectFromStringMinute"
                              full-width
                              @click:minute="$refs.effectFromMenu.save(effectFromStringMinute)"
                            ></v-time-picker>
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
                                v-model="editUserModel.expiredAt"
                                :label="$t('message.expiredAt')"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editUserModel.expiredAt"
                              @input="isShowExpiredAtPanel=false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="6" class="user-ea-m">
                          <v-menu ref="expiredAtMenu"
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
                              >
                              </v-text-field>
                            </template>
                            <v-time-picker
                              v-if="isShowExpiredAtMinutePanel"
                              v-model="expiredAtStringMinute"
                              full-width
                              @click:minute="$refs.expiredAtMenu.save(expiredAtStringMinute)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="5" class="user-al-s">
                          <v-menu ref="startTime"
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
                              >
                              </v-text-field>
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
                          <v-menu ref="endTime"
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
                              >
                              </v-text-field>
                            </template>
                            <v-time-picker
                              v-if="isShowEndTime"
                              v-model="endTime"
                              full-width
                              @click:minute="$refs.endTime.save(endTime)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="2" class="user-al-a">
                          <v-icon size="25" style="color: green; cursor: pointer;" @click="addPeriod()">ti-plus</v-icon>
                        </v-col>
                        <v-col cols="12" class="user-company">
                          <v-select
                            v-model="editUserModel.company_id"
                            :items="companies"
                            item-text="name"
                            item-value="shortName"
                            single-line
                            label="Select Company"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" class="user-block">
                          <v-select
                            v-model="editUserModel.block_id"
                            :items="blocks"
                            item-text="name"
                            item-value="shortName"
                            single-line
                            label="Select Block"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" class="user-periods">
                          <v-select
                            v-model="editUserModel.allowPeriods"
                            :items="editUser.allowPeriods"
                            :label="$t('message.allowPeriods')"
                            :item-text="period => period.startTime + '-' + period.endTime"
                            attach
                            chips                                              
                            multiple
                            :cache-items="true"
                          >
                            <template slot="item" slot-scope="props">
                              {{ props.item.startTime + ' - ' + props.item.endTime }}
                            </template>
                            <template slot="prepend" slot-scope="props">
                              {{ props.item.startTime + ' - ' + props.item.endTime }}
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
					<v-btn class="px-4" color="success" v-on:click="editCurrentUser">{{$t('message.editBtn')}}</v-btn>
					<v-btn class="px-4" color="error" @click.native="closePopup">{{$t('message.close')}}</v-btn>
          <v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import AppConfig from '../../constants/AppConfig';
export default {
    props: ['isShowPopup', 'devices', 'blocks', 'companies', 'floors', 'sites', 'icMasked', 'editUser', 'userTypes', 'effectFromStringMinute', 'expiredAtStringMinute'],
    data() {
      return {
        loading: true,
        errored: false,
        isEditUserValid: true,
        editUserRules: {
          devices: [
            devices => !!devices.length || 'Devices should not empty',
          ],
          name: [ 
            name => !!name || 'Name is required',
            name => (name && name.length <= 10) || 'Name must be less than 10 characters',
          ],
          id: [
            (id) => !!id || "ID is required",
          ],
          ic: [ 
            ic => !!ic || 'IC Card is required',
            ic => (ic?.length === 9) || 'IC Card must be 9 characters',
            ic => ((/^\w+$/.test(ic))) || 'IC Card must be alphanumberic',
          ],
          confidenceLevel: [
            confidenceLevel => !isNaN(confidenceLevel) || 'ConfidenceLevel must be a number',
            confidenceLevel => (confidenceLevel > 0 && confidenceLevel < 100) || 'ConfidenceLevel must between 0 and 100'
          ]
        },
        startTime: "",
        endTime: "",
        isShowStartTime: false,
        isShowEndTime: false,
        isShowEffectFromPanel: false,
        isShowEffectFromMinutePanel: false,
        isShowExpiredAtPanel: false,
        isShowExpiredAtMinutePanel: false,
        facePhoto: {},
        uploadRules: [
          (file) =>
            !file ||
            file.size < 1000000 ||
            "JPG file format (maximum 300Kb & recommended resolution 1280 x 720)"
            // "FacePhoto size should be less than 1 MB!",
        ],
        userBlocks: [ { label: "Block 1", value: 1 }, { label: "Block 2", value: 2 } ,  { label: "Block 3", value:3 } ],
        userSites: [ { label: "Site 1", value: 1 }, { label: "Site 2", value: 2 } ,  { label: "Site 3", value:3 } ],
        userFloors: [ { label: "Floor 1", value: 1 }, { label: "Floor 2", value: 2 } ,  { label: "Floor 3", value:3 } ],
        userCompanies: [ { label: "Company 1", value: 1 }, { label: "Company 2", value: 2 } ,  { label: "Company 3", value:3 } ]
      }
    },
    mounted() {
      // console.log('Device: ' + this.editUser.devices);
      // console.log('icMasked: ' + this.editUser.icCardMasked);
    },
    watch: {
      isShowPopup() {
        this.$refs.editUser?.resetValidation();
      }
    },
    computed: {
      editUserModel: vm => {
        return {
          ...vm.editUser,
          ic: `*****${vm.editUser.ic?.substring(vm.editUser.ic.length - 4, vm.editUser.ic.length)}`}
      }
    },
    methods: {
      async editCurrentUser() {
        if(!this.$refs.editUser.validate()) return
        let urlUpdateUsers = `${AppConfig.ip}${AppConfig.api_port}/users/`; let deviceId = ""; let userId = ""; let blockId = ""; let companyId = ""; let floorId = ""; let siteId = ""; let cardId = ""; let ic = "";
        const editUser = {
          ...this.editUserModel,
          expiredAt: this.editUserModel.expiredAt ? this.editUserModel.expiredAt + ' ' + this.expiredAtStringMinute : undefined,
          effectFrom: this.editUserModel.effectFrom ? this.editUserModel.effectFrom + ' ' + this.effectFromStringMinute : undefined,
        }
        Object.keys(editUser).forEach((key) => {
          if (key === "devices" || key === "userId" || key === "block_id" || key === "company_id" || key === "floor_id" || key === "site_id" || key === "card_id" || key === "ic") {
            deviceId = editUser["devices"]; userId = editUser["userId"]; blockId = editUser["block_id"]; companyId = editUser["company_id"]; floorId = editUser["floor_id"]; siteId = editUser["site_id"]; cardId = editUser["card_id"];
            ic = editUser["ic"];
          }
        });
        urlUpdateUsers += userId + "?devices=" + deviceId;
        let objUpdateUser = { blockId: blockId, companyId: companyId, floorId: floorId, siteId: siteId, cardId: cardId, ic };
        
        const editResponse = await this.$axios.post('/upload/user', editUser)
        if (editResponse.status === 200) {
          const updateRelatedData = await this.$axios.patch(urlUpdateUsers, objUpdateUser);
          try {
            if (updateRelatedData.status === 200) {
              this.$emit('updateSuccess', true)
              this.$emit('closePopup', true)
              Vue.notify({
                group: 'loggedIn',
                type: 'success',
                text: 'Update User successful!'
              })
            }
          } catch (error) {
            this.errored = true;
              console.log(error);
          }
          finally {() => this.loading = false;}
        } else {
          Vue.notify({
            group: 'loggedIn',
            type: 'error',
            text: 'Update user fail. Please try again later!'
          })
        }
      },
      async uploadFile() {
        if (this.facePhoto) {
          const reader = new FileReader();
          reader.addEventListener("load",  () => {
            this.editUserModel.facePhoto = reader.result;
          }, false)
    
          reader.readAsDataURL(this.facePhoto)
        } else {
          this.editUserModel.facePhoto = ""
        }
      },
      addPeriod() {
        this.editUserModel.allowPeriods = [...this.editUserModel.allowPeriods, { startTime: this.startTime, endTime: this.endTime }]
        this.startTime = ""
        this.endTime = ""
      },
      closePopup() {
        this.$emit('closePopup', true)
      }
    }
}
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
@media screen and (max-width: 1024px) {
  .header-table-select-devices,
  .header-table-search {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media only screen and (max-width: 720px) {
  .continer-user-left,
  .continer-user-right {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
