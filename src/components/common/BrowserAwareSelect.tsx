import { FC, useEffect, useRef, useState } from "react";
import { Box, Select, SelectProps, Text } from "@mantine/core";

interface BrowserAwareSelectProps extends Omit<SelectProps, "onChange"> {
  onChange?: (value: string | null) => void;
  value?: string | null;
  data: (string | { value: string; label: string; [key: string]: any })[];
  error?: React.ReactNode;
}

/**
 * BrowserAwareSelect component that automatically switches between
 * Mantine Select and a native select element based on the browser.
 */
const BrowserAwareSelect: FC<BrowserAwareSelectProps> = ({
  onChange,
  value: controlledValue,
  defaultValue,
  data,
  label,
  placeholder,
  error,
  required,
  style,
  radius = "md",
  ...props
}) => {
  const [isFirefox, setIsFirefox] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Detect Firefox on component mount
  useEffect(() => {
    const isFF = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    setIsFirefox(isFF);
  }, []);

  // Get radius value in pixels
  const getRadiusValue = () => {
    if (typeof radius === "number") return `${radius}px`;

    // Convert Mantine radius values to pixels
    const radiusMap: Record<string, string> = {
      xs: "2px",
      sm: "4px",
      md: "8px",
      lg: "16px",
      xl: "32px",
    };

    return radiusMap[radius as string] || "8px"; // default to md (8px)
  };

  // Convert data to a consistent format
  const normalizedData = data.map((item) => {
    if (typeof item === "string") {
      return { value: item, label: item };
    }
    return item;
  });

  // For Firefox, render a native select element with custom styling
  if (isFirefox) {
    return (
      <Box style={{ marginBottom: "1rem", ...style }} ref={selectRef}>
        {label && (
          <Text
            component="label"
            htmlFor={`firefox-select-${typeof label === "string" && label?.replace(/\s+/g, "-").toLowerCase()}`}
            size="sm"
            fw={500}
            style={{
              display: "block",
              marginBottom: "0.25rem",
              color: error ? "var(--mantine-color-error)" : "inherit",
            }}
          >
            {label}{" "}
            {required && (
              <span style={{ color: "var(--mantine-color-error)" }}>*</span>
            )}
          </Text>
        )}

        <div
          className={`firefox-native-select ${isFocused ? "is-focused" : ""} ${error ? "has-error" : ""}`}
          style={{
            position: "relative",
            borderRadius: getRadiusValue(),
            border: `1px solid ${
              error
                ? "var(--mantine-color-error)"
                : isFocused
                  ? "var(--mantine-color-brand-5)"
                  : "var(--mantine-color-gray-4)"
            }`,
            backgroundColor: "white",
            transition: "all 0.2s ease",
            overflow: "hidden", // Ensure the select doesn't overflow the rounded container
          }}
          data-radius={radius}
        >
          <select
            id={`firefox-select-${typeof label === "string" && label?.replace(/\s+/g, "-").toLowerCase()}`}
            value={controlledValue || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (onChange) {
                onChange(val === "" ? null : val);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            style={{
              width: "100%",
              height: "36px",
              padding: "0 12px",
              fontSize: "var(--mantine-font-size-sm)",
              appearance: "none",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: controlledValue
                ? "var(--mantine-color-text)"
                : "var(--mantine-color-placeholder)",
              outline: "none",
              borderRadius: getRadiusValue(),
            }}
            aria-invalid={!!error}
            disabled={props.disabled}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {normalizedData.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom arrow that matches Mantine design */}
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "var(--mantine-color-gray-6)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {error && (
          <Text size="xs" c="red" mt="0.25rem">
            {error}
          </Text>
        )}
      </Box>
    );
  }

  // For all other browsers, use Mantine's Select
  return (
    <Select
      label={label}
      placeholder={placeholder}
      required={required}
      data={data}
      value={controlledValue}
      onChange={onChange}
      error={error}
      style={style}
      radius={radius}
      comboboxProps={{
        withinPortal: true,
        transitionProps: { duration: 150 },
        shadow: "md",
      }}
      {...props}
    />
  );
};

export default BrowserAwareSelect;
