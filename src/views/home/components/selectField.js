import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const SelectField = ({
  title,
  options = [],
  onSelectionChange,
  multiple = false,
  searchPlaceholder = "Search",
  defaultExpanded = false,
  showCounts = true,
  className = "",
  value = [],
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(
    Array.isArray(value) ? value : [value]
  );
  useEffect(() => {
    if (value !== undefined) {
      setSelected(Array.isArray(value) ? value : [value]);
    }
  }, [value, setSelected]);

  const toggleExpanded = () => setExpanded(!expanded);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleOption = (optionValue) => {
    let newSelected;
    if (multiple) {
      newSelected = selected?.includes(optionValue)
        ? selected?.filter((value) => value !== optionValue)
        : [...selected, optionValue];
    } else {
      newSelected = selected?.includes(optionValue) ? [] : [optionValue];
    }
    setSelected(newSelected);
    onSelectionChange?.(multiple ? newSelected : newSelected[0]);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <button
        onClick={toggleExpanded}
        className="w-full p-4 flex justify-between items-center hover:bg-gray-50 text-left"
        aria-expanded={expanded}
      >
        <span className="font-medium text-gray-700">{title}</span>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className="w-full p-2 pr-8 border border-gray-300 rounded text-sm"
            />
            <Search
              className="absolute right-2 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredOptions.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selected?.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className="form-checkbox text-red-600 rounded"
                />
                <span className="text-sm flex-1">{option.label}</span>
                {showCounts && option.count !== undefined && (
                  <span className="text-sm text-gray-500">
                    ({option.count})
                  </span>
                )}
              </label>
            ))}
            {filteredOptions.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-2">
                No options found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectField;
