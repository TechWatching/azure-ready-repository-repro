import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";

const config = new pulumi.Config();
export const apiKey = config.getSecret("ApiKey");

const resourceGroup = new resources.ResourceGroup("rg-breizhCamp", {
  tags: {"Kind": "Demo"}
});
export const rgName = resourceGroup.name;

const storageAccount = new storage.StorageAccount("sacloudest", {
  resourceGroupName: resourceGroup.name,
  sku: {
      name: storage.SkuName.Standard_LRS,
  },
  kind: storage.Kind.StorageV2,
});

const storageAccountKeys = storage.listStorageAccountKeysOutput({
  resourceGroupName: resourceGroup.name,
  accountName: storageAccount.name
});

export const primaryStorageKey = pulumi.secret(storageAccountKeys.keys[0].value);