
local QBCore = exports['qb-core']:GetCoreObject()
local callData = {
    inCall = false,
    answeredCall = false
}
local CallRepeats = 10

local function GenerateCallId(caller, target)
    local CallId = math.ceil(((tonumber(caller) + tonumber(target)) / 100 * 1))
    return CallId
end


RegisterNUICallback('callContact', function(data, cb)
    
    local RepeatCount = 0
    callData.inCall = true
    local callid = GenerateCallId(QBCore.Functions.GetPlayerData().charinfo.phone, data)
    callData.callId = callid
    callData.callNumber = data
    callData.type = "giden"
    TriggerServerEvent("kPhone-server:callContact", data, callid)
    
    SendReactMessage("setCallState", {number = callData.callNumber, type = callData.type, isAnswerd = callData.answeredCall})


    for i = 1, CallRepeats + 1, 1 do
        if not callData.answeredCall then
            if RepeatCount + 1 ~= CallRepeats + 1 then
                if callData.inCall then
                    RepeatCount = RepeatCount + 1
                    TriggerServerEvent("InteractSound_SV:PlayOnSource", "demo", 0.1)
                else
                    break
                end
                Wait(2000)
            else
                CancelCall()
                break
            end
        else
            break
        end
    end


    cb({})
end)

RegisterNetEvent('kPhone-client:callContact')
AddEventHandler('kPhone-client:callContact', function(callerNumber, callid)
    callData.inCall = true
    callData.callId = callid
    callData.callNumber = callerNumber
    callData.type = "gelen"

    local RepeatCount = 0
    for i = 1, CallRepeats + 1, 1 do
        if not callData.answeredCall then
            if RepeatCount + 1 ~= CallRepeats + 1 then
                if callData.inCall then
                    RepeatCount = RepeatCount + 1
                    TriggerServerEvent("InteractSound_SV:PlayOnSource", "ringing", 0.2)
                    SendReactMessage("setCallState", {number = callData.callNumber, type = callData.type, isAnswerd = callData.answeredCall})
                else
                    break
                end
                Wait(2000)
            else
                SendReactMessage("setCallState", nil)
                break
            end
        else
            break
        end
    end
end)

RegisterNUICallback("answerCall", function()
    answerCall()
end)

function answerCall()
    if callData.callId ~= nil and callData.inCall == true and callData.answeredCall == false then
        callData.inCall = true
        callData.answeredCall = true
        SendReactMessage("setCallState", {number = callData.callNumber, type = "gelen", isAnswerd = callData.answeredCall})
        TriggerServerEvent("kPhone-server-answerCall", callData.callNumber)
        exports['pma-voice']:addPlayerToCall(callData.callId)
    end
end

RegisterNetEvent('kPhone-client:answerCall')
AddEventHandler('kPhone-client:answerCall', function(data)
    callData.answeredCall = true
    callData.inCall = true
    SendReactMessage("setCallState", {number = callData.callNumber, type = "giden", isAnswerd = callData.answeredCall})
    exports['pma-voice']:addPlayerToCall(callData.callId)
end)

function cancelCall()
    if callData.inCall == true and callData.callId ~= nil then 
        addLastCall({
            number = callData.callNumber,
            type = callData.type,
            isAnswerd = callData.answeredCall
        })
        callData.inCall = false
        callData.answeredCall = false
        callData.callId = nil
        exports['pma-voice']:removePlayerFromCall(callData.callId)
        SendReactMessage("setCallState", nil)
    end
end

RegisterNUICallback("cancelCall", function()
    cancelCall()
    TriggerServerEvent("kPhone-server:cancelCall", callData.callNumber)
end)

RegisterNetEvent('kPhone-client:cancelCall')
AddEventHandler('kPhone-client:cancelCall', function(data)
    cancelCall()
end)

RegisterNUICallback("saveContacts", function(data, cb)
    TriggerServerEvent("kPhone-server:addContact", data)
end)