import { FC } from "react";
import { Badge, Divider, Group, Stack, Text } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";

export interface PriceItemProps {
  service: string;
  duration?: string;
  price?: string;
  note?: string;
  saving?: string;
  options?: { label: string; price: string }[];
  icon?: React.ReactNode;
}

export const PriceItem: FC<PriceItemProps> = ({
  service,
  duration,
  price,
  note,
  saving,
  options,
  icon,
}) => {
  return (
    <div>
      <Group justify="space-between" wrap="nowrap" mb={4}>
        <Group wrap="nowrap">
          {icon ? (
            icon
          ) : (
            <IconPointFilled size={18} color="#1EB19E" stroke={2} />
          )}
          <Text fw={500}>{service}</Text>
        </Group>
        {saving && (
          <Badge color="brand.4" variant="light" size="sm">
            {saving}
          </Badge>
        )}
      </Group>

      {duration && price && (
        <Text ml={26} size="sm">
          {duration} -{" "}
          <Text span fw={600}>
            {price}
          </Text>
        </Text>
      )}

      {price && !duration && !options && (
        <Text ml={26} size="sm">
          <Text span fw={600}>
            {price}
          </Text>
        </Text>
      )}

      {options && (
        <Stack gap={5} ml={26}>
          {options.map((option, idx) => (
            <Text key={idx} size="sm">
              {option.label} -{" "}
              <Text span fw={600}>
                {option.price}
              </Text>
            </Text>
          ))}
        </Stack>
      )}

      {note && (
        <Text ml={26} size="sm" fs="italic" c="dimmed">
          {note}
        </Text>
      )}

      <Divider my="sm" variant="dotted" />
    </div>
  );
};

export default PriceItem;
