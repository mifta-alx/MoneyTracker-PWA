<script setup lang="ts">
import { HugeiconsIcon } from "@hugeicons/vue";
import {
  Wallet01Icon,
  BankIcon,
  CreditCardIcon,
  PiggyBankIcon,
  Agreement02Icon,
  Airplane01Icon,
  Airpod03Icon,
  AlmsIcon,
  AmazonIcon,
  ApartmentIcon,
  MusicNoteSquare01Icon,
  ChampionIcon,
  BabyBoyDressIcon,
  Basketball02Icon,
  Backpack03Icon,
  BodyPartMuscleIcon,
  Book02Icon,
  Briefcase01Icon,
  BubbleTea02Icon,
  CafeIcon,
  BulbChargingIcon,
  Camera03Icon,
  Car02Icon,
  ChefHatIcon,
  Coffee02Icon,
  DentalToothIcon,
  FlimSlateIcon,
  HandBag01Icon,
  Hamburger02Icon,
  Home07Icon,
  IceCream03Icon,
  Money03Icon,
  LaptopIcon,
  MapsLocation02Icon,
  Mortarboard02Icon,
  PackageIcon,
  Pizza01Icon,
  Plant01Icon,
  RepairIcon,
  SpoonAndKnifeIcon,
  ShoppingBag02Icon,
  ShoppingCart02Icon,
  SmartPhone02Icon,
  SmartWatch01Icon,
  Sofa03Icon,
  SquareLock01Icon,
  StarIcon,
  Store02Icon,
  TemperatureIcon,
  TipsIcon,
  UserMultiple02Icon,
  Brain03Icon,
  BedDoubleIcon,
  FishFoodIcon
} from "@hugeicons/core-free-icons";
const modelValue = defineModel<string>({ default: "wallet" });

const iconOptions = [
  { name: "wallet", value: "wallet", icon: Wallet01Icon },
  { name: "bank", value: "bank", icon: BankIcon },
  { name: "card", value: "card", icon: CreditCardIcon },
  { name: "cash", value: "cash", icon: Money03Icon },
  { name: "piggy", value: "piggy", icon: PiggyBankIcon },
  { name: "aggrement", value: "agreement", icon: Agreement02Icon },
  { name: "airplane", value: "airplane", icon: Airplane01Icon },
  { name: "airpod", value: "airpod", icon: Airpod03Icon },
  { name: "alms", value: "alms", icon: AlmsIcon },
  { name: "amazon", value: "amazon", icon: AmazonIcon },
  { name: "apartment", value: "apartment", icon: ApartmentIcon },
  { name: "music", value: "music", icon: MusicNoteSquare01Icon },
  { name: "award", value: "award", icon: ChampionIcon },
  { name: "babyboy", value: "babyboy", icon: BabyBoyDressIcon },
  { name: "basket", value: "basket", icon: Basketball02Icon },
  { name: "backpack", value: "backpack", icon: Backpack03Icon },
  { name: "bodypart", value: "bodypart", icon: BodyPartMuscleIcon },
  { name: "book", value: "book", icon: Book02Icon },
  { name: "briefcase", value: "briefcase", icon: Briefcase01Icon },
  { name: "bubble-tea", value: "bubble-tea", icon: BubbleTea02Icon },
  { name: "cafe", value: "cafe", icon: CafeIcon },
  { name: "bulb-charging", value: "bulb-charging", icon: BulbChargingIcon },
  { name: "camera", value: "camera", icon: Camera03Icon },
  { name: "car", value: "car", icon: Car02Icon },
  { name: "chef", value: "chef", icon: ChefHatIcon },
  { name: "coffee", value: "coffee", icon: Coffee02Icon },
  { name: "dental", value: "dental", icon: DentalToothIcon },
  { name: "film", value: "film", icon: FlimSlateIcon },
  { name: "handbag", value: "handbag", icon: HandBag01Icon },
  { name: "burger", value: "burger", icon: Hamburger02Icon },
  { name: "home", value: "home", icon: Home07Icon },
  { name: "ice-cream", value: "ice-cream", icon: IceCream03Icon },
  { name: "laptop", value: "laptop", icon: LaptopIcon },
  { name: "maps", value: "maps", icon: MapsLocation02Icon },
  { name: "mortar-board", value: "mortar-board", icon: Mortarboard02Icon },
  { name: "package", value: "package", icon: PackageIcon },
  { name: "pizza", value: "pizza", icon: Pizza01Icon },
  { name: "plant", value: "plant", icon: Plant01Icon },
  { name: "repair", value: "repair", icon: RepairIcon },
  { name: "restaurant", value: "restaurant", icon: SpoonAndKnifeIcon },
  { name: "shopping", value: "shopping", icon: ShoppingBag02Icon },
  { name: "cart", value: "cart", icon: ShoppingCart02Icon },
  { name: "phone", value: "phone", icon: SmartPhone02Icon },
  { name: "watch", value: "watch", icon: SmartWatch01Icon },
  { name: "sofa", value: "sofa", icon: Sofa03Icon },
  { name: "lock", value: "lock", icon: SquareLock01Icon },
  { name: "star", value: "star", icon: StarIcon },
  { name: "store", value: "store", icon: Store02Icon },
  { name: "temperature", value: "temperature", icon: TemperatureIcon },
  { name: "tips", value: "tips", icon: TipsIcon },
  { name: "users", value: "users", icon: UserMultiple02Icon },
  { name: "brain", value: "brain", icon: Brain03Icon },
  { name: "bed", value: "bed", icon: BedDoubleIcon },
  { name: "fish", value: "fish", icon: FishFoodIcon },
];
</script>

<template>
  <div class="grid grid-cols-6 gap-2">
    <label
      v-for="icon in iconOptions"
      :key="icon.name"
      class="relative flex items-center justify-center cursor-pointer group"
    >
      <input
        type="radio"
        name="icon-picker"
        :value="icon.value"
        v-model="modelValue"
        class="sr-only"
      />

      <div
        class="size-14 shrink-0 flex text-xl items-center justify-center rounded-xl border duration-300 ease-in-out transition-all"
        :class="[
          modelValue === icon.value
            ? 'border-primary/70 bg-primary/10 text-primary'
            : 'border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground/50',
        ]"
      >
        <HugeiconsIcon
          :icon="icon.icon"
          :size="20"
          color="currentColor"
          :strokeWidth="1.5"
        />
      </div>
    </label>
  </div>
</template>
