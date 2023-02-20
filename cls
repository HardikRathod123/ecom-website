warning: in the working copy of 'client/components/Footer.vue', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'client/static/css/default.css', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/client/components/Footer.vue b/client/components/Footer.vue[m
[1mindex 587bace..0117c0f 100644[m
[1m--- a/client/components/Footer.vue[m
[1m+++ b/client/components/Footer.vue[m
[36m@@ -123,7 +123,7 @@[m
               </div>[m
             </div>[m
             <div class="col-md-8 col-sm-12">[m
[31m-              <span class="icp-container-desktop">[m
[32m+[m[32m              <div class="icp-container-desktop">[m
                 <div class="navFooterLine">[m
                   <a href="#" class="icp-button">[m
                     <div class="icp-nav-globe-img-2 icp-button-globe-2 icp-nav-globe-curr-fix">​</div>[m
[36m@@ -139,7 +139,7 @@[m
                     <span class="icp-color-base">United States</span>[m
                   </a>[m
                 </div>[m
[31m-              </span>[m
[32m+[m[32m              </div>[m
             </div>[m
           </div>[m
         </div>[m
[1mdiff --git a/client/pages/address/add.vue b/client/pages/address/add.vue[m
[1mindex 480f04d..d76ae1f 100644[m
[1m--- a/client/pages/address/add.vue[m
[1m+++ b/client/pages/address/add.vue[m
[36m@@ -57,7 +57,6 @@[m
                       >[m
                         {{ country.name.official }}[m
                       </option>[m
[31m-                      <option></option>[m
                     </select>[m
                   </div>[m
                 <!-- //   ?     Full name -->[m
[36m@@ -78,7 +77,7 @@[m
                       class="a-input-text"[m
                       style="width: 100%;"[m
                       placeholder="Street and number, P.O. box, c/o."[m
[31m-                      v-model="streetAdress1"[m
[32m+[m[32m                      v-model="streetAddress1"[m
                     />[m
               <!-- //   ?       Street Address -->[m
                     <input[m
[36m@@ -86,7 +85,7 @@[m
                       class="a-input-text a-spacing-top-small"[m
                       style="width: 100%;"[m
                       placeholder="Apartment, suite, unit, building, floor, etc."[m
[31m-                      v-model="streetAdress2"[m
[32m+[m[32m                      v-model="streetAddress2"[m
                     />[m
                   </div>[m
                <!-- //   ?      City -->[m
[36m@@ -230,10 +229,10 @@[m [mexport default {[m
   },[m
   data() {[m
     return {[m
[31m-      country: "United States of America",[m
[32m+[m[32m      country: "",[m
       fullName: "",[m
[31m-      streetAdress1: "",[m
[31m-      streetAdress2: "",[m
[32m+[m[32m      streetAddress1: "",[m
[32m+[m[32m      streetAddress2: "",[m
       state: "",[m
       city: "",[m
       zipCode: "",[m
[36m@@ -248,7 +247,7 @@[m [mexport default {[m
         let data = {[m
           country: this.country,[m
           fullName: this.fullName,[m
[31m-          streetAdress: this.streetAdress1 + " / " + this.streetAdress2,[m
[32m+[m[32m          streetAddress: this.streetAddress1 + " / " + this.streetAddress2,[m
           city: this.city,[m
           state: this.state,[m
           zipCode: this.zipCode,[m
[36m@@ -258,7 +257,7 @@[m [mexport default {[m
         };[m
         let response = await this.$axios.$post("/api/addresses", data);[m
         console.log(response);[m
[31m-        if (response.status == true) {[m
[32m+[m[32m        if (response.status  == true) {[m
           this.$router.push("/address");[m
         }[m
       } catch (err) {[m
[1mdiff --git a/client/static/css/default.css b/client/static/css/default.css[m
[1mindex cea8011..d212996 100644[m
[1m--- a/client/static/css/default.css[m
[1m+++ b/client/static/css/default.css[m
[36m@@ -2829,7 +2829,7 @@[m [ma.action-button:visited .action-inner {[m
     display: none !important;[m
   }[m
 }[m
[31m-span.icp-container-desktop {[m
[32m+[m[32mdiv.icp-container-desktop {[m
     vertical-align: top;[m
     margin: 18px auto 0;[m
     margin-left: 70px;[m
[36m@@ -2894,9 +2894,8 @@[m [mdiv.navFooterLine {[m
     color: #CCC;[m
 }[m
 .nav-arrow.icp-up-down-arrow {[m
[31m-    background: url(https://m.media-amazon.com/images/G/01/AUIClients/InternationalCustomerPref…ncesNavAssets-icp_sprite-7d1bfde…._V2_.png);[m
     width: 12px;[m
[31m-    height: 12px;[m
[32m+[m[32m    height: 12px;KW[m
     background-position: -77px -80px;[m
     position: relative;[m
     left: 12px;[m
[1mdiff --git a/server/routes/address.js b/server/routes/address.js[m
[1mindex a299772..27491c8 100644[m
[1m--- a/server/routes/address.js[m
[1m+++ b/server/routes/address.js[m
[36m@@ -1,32 +1,35 @@[m
 const express = require("express");[m
 const router = express.Router();[m
 const verifyToken = require("../middlewares/verify-token");[m
[31m-const axios = require('axios');[m
[32m+[m[32mconst axios = require("axios");[m
 [m
 const Address = require("../models/address");[m
[32m+[m[32mconst User = require("../models/user");[m
 [m
 //   ?   Add a new Address[m
 router.post("/addresses", verifyToken, async (req, res) => {[m
   try {[m
[31m-    let address = new Address();[m
[32m+[m[32m    const address = new Address();[m
[32m+[m[32m    address.user = req.decoded._id;[m
     address.country = req.body.country;[m
     address.fullName = req.body.fullName;[m
[31m-    address.streetAddress = req.body.streetAddress;[m
[32m+[m[32m    address.streetAdress = req.body.streetAdress;[m
     address.city = req.body.city;[m
[31m-    address.state = req.body.state;[m
     address.zipCode = req.body.zipCode;[m
[32m+[m[32m    address.state = req.body.state;[m
     address.phoneNumber = req.body.phoneNumber;[m
[31m-    address.deliveryInstructions = req.body.deliveryInstructions;[m
[32m+[m[32m    address.deliverInstructions = req.body.deliverInstructions;[m
     address.securityCode = req.body.securityCode;[m
[31m-    address.user = req.decoded._id;[m
 [m
[32m+[m[32m    await address.save();[m
     res.json({[m
[31m-      success: true,[m
[31m-      message: "Successfully created a new address",[m
[32m+[m[32m      status: true,[m
[32m+[m[32m      message: "Successfuly added an Address ...!",[m
     });[m
   } catch (err) {[m
     res.status(500).json({[m
[31m-      success: err.message,[m
[32m+[m[32m      status: false,[m
[32m+[m[32m      message: err.message,[m
     });[m
   }[m
 });[m
[36m@@ -77,12 +80,44 @@[m [mrouter.get("/countries", async (req, res) => {[m
   }[m
 });[m
 [m
[32m+[m[32m//   ?    Put Request - Edit a address[m
[32m+[m[32mrouter.put("/addresses/:id", verifyToken, async (req, res) => {[m
[32m+[m[32m  try {[m
[32m+[m[32m    const foundAddress = await Address.findOne({ _id: req.params.id });[m
[32m+[m[32m    if (foundAddress) {[m
[32m+[m[32m      if (req.body.country) foundAddress.country = req.body.country;[m
[32m+[m[32m      if (req.body.fullName) foundAddress.fullName = req.body.fullName;[m
[32m+[m[32m      if (req.body.streetAdress)[m
[32m+[m[32m        foundAddress.streetAdress = req.body.streetAdress;[m
[32m+[m[32m      if (req.body.city) foundAddress.city = req.body.city;[m
[32m+[m[32m      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;[m
[32m+[m[32m      if (req.body.state) foundAddress.state = req.body.state;[m
[32m+[m[32m      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;[m
[32m+[m[32m      if (req.body.deliverInstructions)[m
[32m+[m[32m        foundAddress.deliverInstructions = req.body.deliverInstructions;[m
[32m+[m[32m      if (req.body.securityCode)[m
[32m+[m[32m        foundAddress.securityCode = req.body.securityCode;[m
[32m+[m[32m    }[m
[32m+[m[32m    await foundAddress.save();[m
[32m+[m
[32m+[m[32m    res.json({[m
[32m+[m[32m      status: true,