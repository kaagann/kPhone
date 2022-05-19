local QBCore = exports['qb-core']:GetCoreObject()
local phoneProp = 0
local phoneModel = `prop_npc_phone_02`
local phoneOpen = false

local phoneAnimation = {
    lib = nil,
    anim = nil
}

RegisterKeyMapping('phone', 'Open Phone', 'keyboard', 'F1')

function SendReactMessage(action, data)
    SendNUIMessage({
      action = action,
      data = data
    })
end

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    phoneOpen = shouldShow
    
    if shouldShow then
        DoPhoneAnimation('cellphone_text_in')
    else
        StopAnimTask(PlayerPedId(), phoneAnimation.lib, phoneAnimation.anim, 2.5)
        deletePhone()
        phoneAnimation = {
            lib = nil,
            anim = nil
        }
    end

    SendReactMessage('setVisible', shouldShow)
end

RegisterNUICallback('hideFrame', function(data, cb)
    toggleNuiFrame(false)
    cb({})
end)


RegisterCommand("phone", function()
    toggleNuiFrame(true)
    setPhoneData()
end)

function setPhoneData()
    SendReactMessage("setPhoneData", QBCore.Functions.GetPlayerData())

    QBCore.Functions.TriggerCallback("kPhone-server:getContacts", function(data)
        SendReactMessage("setContactData", data)
    end)

    QBCore.Functions.TriggerCallback("kPhone-server:getBills", function(data)
        SendReactMessage("setBills", data)
    end)

    QBCore.Functions.TriggerCallback("kPhone-server:getMessages", function(data)
        SendReactMessage("setMessagesData", data)
    end)

    QBCore.Functions.TriggerCallback("kPhone-server:getMails", function(data)
        SendReactMessage("setMails", data)
    end)

    getTweets()


    

    SetTimeout(250, function()
        newPhoneProp()
    end)

end


RegisterNUICallback("sendMessage", function(data)
    TriggerServerEvent("kPhone-server:sendMessage", data)
end)

RegisterNetEvent('kPhone-client:sendMessage')
AddEventHandler('kPhone-client:sendMessage', function(data, number)
    SendReactMessage("sendMessage", {
        data = data,
        number = number
    })
end)

RegisterNetEvent('kPhone-client:sendNotification')
AddEventHandler('kPhone-client:sendNotification', function(data)
    sendPhoneNotification(data)
end)

function sendPhoneNotification(data) 
    setFullOpen(false)
    SendReactMessage("sendNotification", data )
end

function setFullOpen(bool)
    SendReactMessage("setFullOpen", bool)
end

RegisterNUICallback("newTweet", function(data)
    TriggerServerEvent("kPhone-server:newTweet", data)
end)

function getTweets()
    QBCore.Functions.TriggerCallback("kPhone-server:getTweets", function(data)
        SendReactMessage("setTweets", data)
    end)
end

RegisterNetEvent("kPhone-client:updateTweets", function(data)
    SendReactMessage("setTweets", data)
end)

function addLastCall(data)
    SendReactMessage("addLastCall", data)
end


RegisterNUICallback("newAds", function(data)
    TriggerServerEvent("kPhone-server:newAds", data)
end)

RegisterNUICallback("getAds", function(data, cb)
    QBCore.Functions.TriggerCallback("kPhone-server:getAds", function(data)
        cb(data)
    end)
end)

RegisterNUICallback("changeBG", function(newBG)
    TriggerServerEvent("kPhone-server:changeBG", newBG)
end)

RegisterNUICallback("transferMoney", function(data)
    TriggerServerEvent("kPhone-server:transferMoney", data)
end)

local function LoadAnimation(dict)
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
		Wait(1)
	end
end

local function CheckAnimLoop()
    CreateThread(function()
        while phoneAnimation.lib ~= nil and phoneAnimation.anim ~= nil do
            local ped = PlayerPedId()
            if not IsEntityPlayingAnim(ped, phoneAnimation.lib, phoneAnimation.anim, 3) then
                LoadAnimation(phoneAnimation.lib)
                TaskPlayAnim(ped, phoneAnimation.lib, phoneAnimation.anim, 3.0, 3.0, -1, 50, 0, false, false, false)
            end
            Wait(500)
        end
    end)
end

function newPhoneProp()
	deletePhone()
	RequestModel(phoneModel)
	while not HasModelLoaded(phoneModel) do
		Wait(1)
	end
	phoneProp = CreateObject(phoneModel, 1.0, 1.0, 1.0, 1, 1, 0)

	local bone = GetPedBoneIndex(PlayerPedId(), 28422)
	if phoneModel == `prop_cs_phone_01` then
		AttachEntityToEntity(phoneProp, PlayerPedId(), bone, 0.0, 0.0, 0.0, 50.0, 320.0, 50.0, 1, 1, 0, 0, 2, 1)
	else
		AttachEntityToEntity(phoneProp, PlayerPedId(), bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	end
end

function deletePhone()
	if phoneProp ~= 0 then
		DeleteObject(phoneProp)
		phoneProp = 0
	end
end

function DoPhoneAnimation(anim)
    local ped = PlayerPedId()
    local AnimationLib = 'cellphone@'
    local AnimationStatus = anim
    if IsPedInAnyVehicle(ped, false) then
        AnimationLib = 'anim@cellphone@in_car@ps'
    end
    LoadAnimation(AnimationLib)
    TaskPlayAnim(ped, AnimationLib, AnimationStatus, 3.0, 3.0, -1, 50, 0, false, false, false)
    phoneAnimation.lib = AnimationLib
    phoneAnimation.anim = AnimationStatus
    CheckAnimLoop()
end

RegisterNUICallback("payBill", function(data)
    TriggerServerEvent("kPhone-server:payBill", data)
end)

RegisterNetEvent("kPhone-client:updateBills", function()
    QBCore.Functions.TriggerCallback("kPhone-server:getBills", function(data)
        SendReactMessage("setBills", data)
    end)
end)

local takePhoto = false
local webhook = "https://discord.com/api/webhooks/945320083562041374/jGNOhBT2SYly-qOuQ3uZInLGWqBCRy_TPdpxodOvN6wUcCmu_2YZDFxNvPiink8CVJGF"
local frontCam = false

RegisterNUICallback("takePhoto", function(data, cb)
    CreateMobilePhone(1)
    CellCamActivate(true, true)
    takePhoto = true
    SetNuiFocus(false, false)

    while takePhoto do
        Citizen.Wait(0)

        if IsControlJustPressed(1, 27) then -- Toogle Mode
            frontCam = not frontCam
            CellFrontCamActivate(frontCam)
        elseif IsControlJustPressed(1, 177) then -- CANCEL
            DestroyMobilePhone()
            CellCamActivate(false, false)
            cb("")
            takePhoto = false
            SetNuiFocus(true, true)
            break
        elseif IsControlJustPressed(1, 176) then -- TAKE.. PIC
            exports['screenshot-basic']:requestScreenshotUpload(webhook, "files[]", function(data)
            local resp = json.decode(data)
            DestroyMobilePhone()
            CellCamActivate(false, false)
            SetNuiFocus(true, true)
            TriggerServerEvent("kPhone:server-savePhoto", resp.attachments[1].proxy_url)
            cb(resp.attachments[1].proxy_url)
        end)

        takePhoto = false
    end
  end
end)

RegisterNUICallback("setProfilePic", function(data)
    TriggerServerEvent("kPhone:server-setProfilePic", data)
end)

RegisterNetEvent("kPhone-client:sendMails")
AddEventHandler("kPhone-client:sendMails", function(data)
    TriggerServerEvent("kPhone-server:sendMails", data)
end)
